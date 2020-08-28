from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("_auth.urls")),
    path('', include("core.urls")),
]
