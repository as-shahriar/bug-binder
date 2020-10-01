from django.urls import path
from _auth import views

urlpatterns = [
    path('', views.home, name="home"),
    path('forget/', views.forget),
    path('reset/', views.reset),
    path('logout/', views.logoutView, name="logout")
]
