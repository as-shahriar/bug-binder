from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Profile
from _auth.models import User


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

    return render(request, 'core/profile.html', {"profile": profile})


@login_required
@csrf_exempt
def userView(request, username):
    try:
        profile = get_object_or_404(
            Profile, user=get_object_or_404(User, username=username))
        return render(request, 'core/user.html', {"profile": profile})
    except:
        return redirect("/dashboard/")
