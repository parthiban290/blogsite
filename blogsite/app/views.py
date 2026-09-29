from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.utils.text import slugify
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as django_logout
from django.utils import timezone
from django.db.models import Q
from django.db.models import Count
import random
from .models import*
# Create your views here.

def landingpage(request):
    sitename= "BlogSite - A Community for Creators"
    return render(request,"base.html",{'pagename':sitename})


def homepage(request):
    sitename="Blogsite - Home"
    posts = Post.objects.filter(status="published").order_by("-published_at")
    profiles = Profile.objects.all()
    trending_tags = Tag.objects.annotate(post_count=Count("post")).order_by("-post_count")[:5]

    suggested_users = list(
    User.objects.exclude(id=request.user.id))
    random.shuffle(suggested_users)
    suggested_users = suggested_users[:5]
    return render(request,"home.html",{'pagename':sitename,"posts":posts,"profiles":profiles,"trending_tags": trending_tags,"suggested_users": suggested_users})


def explorepage(request):
    sitename="Blogsite - explore"
    query = request.GET.get("q", "").strip()
    explorepost = Post.objects.filter(status="published").order_by("-published_at")
    if query:
        explorepost = explorepost.filter(
            Q(title__icontains=query) |
            Q(content__icontains=query) |
            Q(category__name__icontains=query) |
            Q(tags__name__icontains=query)
        ).distinct()
    explorepost = explorepost.order_by("-published_at")
    return render(request,"explore.html",{'pagename':sitename,"explorepost":explorepost,"query":query})

def createpost(request):
    if request.method == "POST":
        post = Post()
        post.author = request.user
        post.title = request.POST.get("title")
        base_slug = slugify(post.title)
        post.slug = base_slug


        if Post.objects.filter(slug=post.slug).exists():
            count = 2
            while Post.objects.filter(slug=f"{base_slug}-{count}").exists():
                count += 1
                post.slug = f"{base_slug}-{count}"
        post.content = request.POST.get("content")
        post.excerpt = request.POST.get("excerpt","")


        
        if request.FILES.get("cover_image"):
            post.cover_image = request.FILES.get("cover_image")
        post_type = PostType.objects.get(name=request.POST.get("post_type"))
        post.post_type = post_type
        category = Category.objects.get(name=request.POST.get("category"))
        post.category = category
        post.save() 
        tags = request.POST.get("tags")


        if tags:
            tag_names = tags.split(",")
            for tag_name in tag_names:
                tag_name = tag_name.strip().lstrip("#")
                if tag_name:
                    tag, created = Tag.objects.get_or_create(name=tag_name,slug=slugify(tag_name))
                    post.tags.add(tag)
        return redirect("homepage")

    return render(request,"createpost.html",{"pagename": "Blogsite - createpost"}
    )
@login_required
def bookmark(request):
    sitename="Blogsite - bookmark"
    saveposts = SavedPost.objects.filter(user=request.user).order_by("-created_at")
    return render(request,"bookmark.html",{'pagename':sitename,"savedpost":saveposts})

@login_required
def profilepage(request):
    profile,created = Profile.objects.get_or_create(user=request.user,
    defaults={"display_name": request.user.username})

    posts = Post.objects.filter(author=request.user,status="published").order_by("-published_at")
    drafts = Post.objects.filter(author=request.user,status="draft").order_by("-updated_at")

    postcount = posts.count
    return render(request,"profile.html",{"pagename":"BlogSite - profile","profile":profile,"posts":posts,"savedraft":drafts,"post_count":postcount})

def editprofile(request):
    
    profile,create = Profile.objects.get_or_create(user=request.user,
    defaults ={"display_name":request.user.username}
    )
    if request.method == "POST":
        profile.display_name = request.POST.get("display_name")
        profile.bio = request.POST.get("bio")
        profile.job_title = request.POST.get("job_title")
        profile.company = request.POST.get("company")
        profile.location = request.POST.get("location")
        profile.website = request.POST.get("website")
        profile.github = request.POST.get("github")
        profile.linkedin = request.POST.get("linkedin")
        profile.twitter = request.POST.get("twitter")
        profile.instagram = request.POST.get("instagram")
        if request.FILES.get("avatar"):
            profile.avatar = request.FILES.get("avatar")
        if request.FILES.get("cover_image"):
            profile.cover_image = request.FILES.get("cover_image")

        action = request.POST.get("action")
        if action == "publish":
            post.status = "published"
            post.published_at = timezone.now()
        elif action == "draft":
            post.status = "draft"
            post.published_at = None
        profile.save()
        return redirect("profile")
        
    return render(request,"edit-profile.html",{"pagename":"Blogsite - edit-profile","profile":profile,})

def signinpage(request):
    if request.method == "POST":
        action = request.POST.get("action")
        if action == "signup":
            username = request.POST.get("username")
            email = request.POST.get("email")
            password = request.POST.get("password")

            user = User.objects.create_user(
                username = username,
                email = email,
                password = password
            )

        elif action == "signin":

            email = request.POST.get("email")
            password = request.POST.get("password")

            user_obj = User.objects.filter(email=email).first()

            if user_obj is not None:
                user = authenticate(request,username=user_obj.username,password=password)
                if user is not None:
                    login(request, user)
                    return redirect("homepage")
    return render(request,"auth.html",{"pagename":"BlogSite - SignIn"})

def logoutpage (request):
    django_logout(request)
    return redirect("landingpage")

@login_required
def savepost(request, post_id):

    post = Post.objects.get(id=post_id)

    SavedPost.objects.get_or_create(
        user=request.user,
        post=post
    )
    next_url = request.GET.get("next")

    if next_url:
        return redirect(next_url)

    return redirect("homepage")


def readingpage(request,slug):
    post = get_object_or_404(Post,slug=slug,status="published")
    return render(request, "detailpost.html",{"pagename":post.title,"post":post})

@login_required
def deletepost(request, post_id):

    post = get_object_or_404(
        Post,
        id=post_id,
        author=request.user
    )

    post.delete()

    return redirect("profile")


@login_required
def savedremove(request, post_id):

    savedpost = get_object_or_404(
        SavedPost,
        post_id=post_id,
        user=request.user
    )

    savedpost.delete()

    return redirect("bookmark")

@login_required
def deletedraft(request, post_id):
    post = get_object_or_404(
        Post,
        id=post_id,
        author=request.user,
        status="draft"
    )

    post.delete()

    return redirect("profile")