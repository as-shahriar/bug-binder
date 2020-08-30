from django.shortcuts import render


def dashboard(request):
    return render(request, 'core/dashboard.html')


def userView(request):
    return render(request, 'core/user.html')


def profileView(request):
    return render(request, 'core/profile.html')


def issueView(request):
    return render(request, 'core/bug-issue.html')
