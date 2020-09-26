from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from _auth.models import User


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
            return JsonResponse({'status': 200})
        except:
            return JsonResponse({'status': 400})
    return render(request, 'auth/home.html')
