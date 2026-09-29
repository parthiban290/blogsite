from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE)
    display_name= models.CharField(max_length=100)
    bio = models.TextField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    company=models.CharField(max_length=100, blank=True)
    location=models.CharField(max_length=100, blank=True)
    website=models.URLField(max_length=100, blank=True)
    github=models.URLField(max_length=100, blank=True)
    instagram=models.URLField(max_length=100,blank=True)
    linkedin=models.URLField(max_length=100,blank=True)
    twitter=models.URLField(max_length=100,blank=True)
    avatar=models.ImageField(upload_to="user/userphoto", blank=True,null=True)
    cover_image=models.ImageField(upload_to="user/coverimage", blank=True,null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        
        return self.display_name


class PostType(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=160,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Post(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220,unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="post/coverimage/",blank=True,null=True)
    post_type = models.ForeignKey(PostType,on_delete=models.PROTECT)
    category = models.ForeignKey(Category,on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag,blank=True)
    status = models.CharField(max_length=20,choices=[
            ("draft", "Draft"),
            ("published", "Published"),],default="draft" )
    published_at = models.DateTimeField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class SavedPost(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"],name="unique_saved_post")
        ]


    def __str__(self):
        return f"{self.user.username} saved {self.post.title}"

