from django.shortcuts import render


def dashboard(request):
    return render(request, 'core/dashboard.html')


def projectView(request):
    return render(request, 'core/project.html')


def issueView(request):
    return render(request, 'core/bug-issue.html')


def taskView(request):
    return render(request, 'core/task.html')
