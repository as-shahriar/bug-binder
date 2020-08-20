from django.urls import path
from _auth import views

urlpatterns = [
    path('', views.home)
]
