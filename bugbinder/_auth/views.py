from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from _auth.models import User, Code
from utils import async_send_mail, get_code, get_hash
from django.db.models import Q
from django.conf import settings  # EMAIL_HOST_USER, EMAIL_HOST_PASSWORD


@csrf_exempt
def home(request):
    if request.user.is_authenticated:
        return redirect("dashboard")
    if request.method == "POST" and "login" in request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username != "" and password != "":
            # if try using username
            user = authenticate(username=username, password=password)
            if user is None:
                try:
                    # if try using email
                    obj = User.objects.get(email=username)
                    user = authenticate(
                        username=obj.username, password=password)
                except:
                    return JsonResponse({'status': 404})  # user not found
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 200})  # user found
        else:
            return JsonResponse({'status': 400})  # bad request
    elif request.method == "POST" and "signup" in request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        try:
            if User.objects.filter(email=email).count() >= 1:
                raise ValueError
            user = User()
            user.username = username
            user.set_password(password)
            user.email = email
            user.save()
            user = authenticate(username=username, password=password)
            login(request, user)
            return JsonResponse({'status': 200})
        except:
            return JsonResponse({'status': 400})
    return render(request, 'auth/home.html')


def logoutView(request):
    logout(request)
    return redirect('/')


@csrf_exempt
def forget(request):
    # Comment out in production
    if settings.EMAIL_HOST_PASSWORD == "":
        raise ValueError(
            "Email password is missing. Set password in EMAIL_HOST_PASSWORD at settings.py")

    email = request.POST.get("email")
    try:
        user = User.objects.filter(
            Q(email=email) | Q(username=email)
        ).first()
        code = get_code()
        if Code.objects.filter(user=user).count() > 0:
            obj = Code.objects.filter(user=user).first()
        else:
            obj = Code()
        obj.code = get_hash(code)
        obj.user = user
        obj.save()
        username = user.username
        subject = "Bugbinder | Reset Password."
        message = f"Dear {username},\nYou recently requested to reset your password for your Bugbinder account.\n\nCODE: {code}\n\nIf you didn't request a password reset, please ignore this email.\n\nThanks,\nBugbinder"
        async_send_mail(subject, message, settings.EMAIL_HOST_USER, user.email)
        return JsonResponse({'status': 200})
    except:
        return JsonResponse({'status': 403})


@csrf_exempt
def reset(request):
    email = request.POST.get("email")
    code = request.POST.get("code")
    password = request.POST.get("password").strip()
    try:
        user = User.objects.filter(
            Q(email=email) | Q(username=email)
        ).first()
        obj = Code.objects.filter(user=user).first()
        if get_hash(code) == obj.code:
            obj.delete()
            user.set_password(password)
            user.save()
            user = authenticate(username=user.username, password=password)
            login(request, user)
        else:
            raise ValueError
        return JsonResponse({'status': 200})
    except:
        return JsonResponse({'status': 403})
