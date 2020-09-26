from django.urls import path, include
from _profile import views

urlpatterns = [
    path('profile/', views.profileView, name="profile"),
    path('u/<str:username>', views.userView),
]
