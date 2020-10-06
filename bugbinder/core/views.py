from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Task
from django.db.models import Q
from _auth.models import User
from django.http import JsonResponse


@login_required
def dashboard(request):
    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        project = Project(owner=request.user)
        project.title = title
        project.description = description
        project.save()
        return redirect("project", id=project.id)
    projects = Project.objects.filter(
        Q(owner=request.user) | Q(dev__in=[request.user])
    )

    context = {
        'projects': projects
    }
    return render(request, 'core/dashboard.html', context)


def projectView(request, id):
    try:
        project = Project.objects.get(id=id)
    except:
        project = None

    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        project.title = title
        project.description = description
        project.save()
    return render(request, 'core/project.html', {"project": project})


@login_required
@csrf_exempt
def assign(request):
    if request.method == "POST":
        id = request.POST.get('id')
        username = request.POST.get('username')
        user = User.objects.get(username=username)

        task = Task.objects.get(id=id)
        if request.user == Project.objects.get(task__in=[task]).owner or request.user == user:
            print("yes")
        return JsonResponse({'status': 200})


def issueView(request):
    return render(request, 'core/bug-issue.html')


def taskView(request):
    return render(request, 'core/task.html')
