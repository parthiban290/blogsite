from django.urls import path
from .views import *

urlpatterns=[
    path("",landingpage,name="landingpage"),
    path("Home/",homepage,name="homepage"),
    path("explore/",explorepage,name="explore"),
    path("write/",createpost,name="createpost"),
    path("bookmark/",bookmark,name="bookmark"),
    path("profile/",profilepage,name="profile"),
    path("profile/edit-profile",editprofile,name="editprofile"),
    path("signin/",signinpage,name="signinpage"),
    path("logout/",logoutpage,name="logout"),
    path("save-post/<int:post_id>/",savepost,name="savepost"),
    path("reading post/",readingpage,name="readingpost"),
    path("post/<slug:slug>/", readingpage, name="readingpage"),
    path("post/delete/<int:post_id>/",deletepost,name="deletepost"),
    path("saved-remove/<int:post_id>/",savedremove,name="savedremove"),
    path("delete-draft/<int:post_id>/",deletedraft,name="deletedraft")
]