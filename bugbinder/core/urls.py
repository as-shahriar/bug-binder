from django.urls import path, include
from core import views
urlpatterns = [
    path('dashboard', views.dashboard),
    path('u', views.userView),

]
