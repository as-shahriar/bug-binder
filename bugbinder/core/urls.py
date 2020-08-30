from django.urls import path, include
from core import views
urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
    path('u/', views.userView),
    path('profile/', views.profileView, name="profile"),

]
