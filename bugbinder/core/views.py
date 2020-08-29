from django.shortcuts import render


def dashboard(request):
    return render(request, 'core/dashboard.html')


def userView(request):
    return render(request, 'core/user.html')
