from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Profile
from _auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from core.views import count_task


@login_required
@csrf_exempt
def profileView(request):
    try:
        profile = get_object_or_404(Profile, user=request.user)
    except:
        profile = Profile()
        profile.name = "---------------------"
        profile.mobile = "---------------------"
        profile.office = "---------------------"

    if request.method == "POST":
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            mobile = request.POST.get('mobile')
            office = request.POST.get('office')
            github = request.POST.get('github')
            linkedin = request.POST.get('linkedin')

            profile.user = request.user
            profile.name = name
            profile.mobile = mobile
            profile.office = office
            profile.github = github
            profile.linkedin = linkedin

            if User.objects.filter(email=email).exclude(username=request.user.username).count() >= 1:
                raise ValueError
            profile.user.email = email
            profile.user.save()
            profile.save()
            return JsonResponse({'status': 200})
        except:
            return JsonResponse({'status': 403})

    return render(request, 'core/profile.html', {"profile": profile, 'task_count': count_task(request)})


@login_required
@csrf_exempt
def userView(request, username):
    try:
        profile = get_object_or_404(
            Profile, user=get_object_or_404(User, username=username))
        return render(request, 'core/user.html', {"profile": profile, 'task_count': count_task(request)})
    except:
        return redirect("/dashboard/")


@login_required
@csrf_exempt
def password_change(request):
    if request.method == "POST":
        c_pass = request.POST.get("c_pass")
        password = request.POST.get("password")
        if not password == "":
            user = User.objects.get(username=request.user.username)
            if authenticate(username=user.username, password=c_pass):
                user.set_password(password)
                user.save()
                login(request, user)
                return JsonResponse({'status': 200})
        return JsonResponse({'status': 403})


@csrf_exempt
@login_required
def delete_account(request):
    if request.method == "POST":
        request.user.delete()
        return JsonResponse({"status": 200})
