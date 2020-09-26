from django.contrib import admin
from .models import Profile


class ProfileConf(admin.ModelAdmin):
    list_display = ('name', 'id', 'user')


admin.site.register(Profile, ProfileConf)
