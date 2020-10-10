from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Task
from django.db.models import Q
from _auth.models import User
from _profile.models import Profile
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
        project.dev.add(request.user)
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
        try:
            user = User.objects.get(username=username)
            task = Task.objects.get(id=id)
            project = Project.objects.get(task__in=[task])
            if request.user == project.owner or request.user == user:
                task.dev = user
                task.assigned = True
                project.assigned = project.assigned + 1
                task.save()
                project.save()
                return JsonResponse({'status': 200})
            raise ValueError

        except:
            return JsonResponse({'status': 403})


@login_required
@csrf_exempt
def delete_task(request):
    if request.method == "POST":
        try:
            id = request.POST.get('id')
            task = Task.objects.get(id=id)
            project = Project.objects.get(task__in=[task])
            if request.user == project.owner:
                task.delete()
                return JsonResponse({'status': 200})
            return JsonResponse({'status': 403})
        except:
            return JsonResponse({'status': 403})


@login_required
@csrf_exempt
def delete_project(request):
    if request.method == "POST":
        try:
            id = request.POST.get('id')
            project = Project.objects.get(id=id)
            if request.user == project.owner:
                project.delete()
                return JsonResponse({'status': 200})
            return JsonResponse({'status': 400})
        except:
            return JsonResponse({'status': 400})


@login_required
@csrf_exempt
def edit_project(request):
    if request.method == "POST":
        try:
            id = request.POST.get('id')
            title = request.POST.get('title')
            description = request.POST.get('description')
            project = Project.objects.get(id=id)
            if request.user == project.owner:
                project.title = title
                project.description = description
                project.save()
                return JsonResponse({'status': 200})
            return JsonResponse({'status': 403})
        except:
            return JsonResponse({'status': 400})


@login_required
@csrf_exempt
def search_dev(request):
    if request.method == "POST":
        try:
            # if True:
            email = request.POST.get('email')
            user = User.objects.get(
                Q(email=email) | Q(username=email)
            )
            profile = Profile.objects.get(user=user)
            return JsonResponse({'name': profile.name, 'github': profile.github, 'username': user.username, 'status': 200})
        except:
            return JsonResponse({'status': 400})


@login_required
@csrf_exempt
def save_dev(request):
    if request.method == "POST":
        try:
            project_id = request.POST.get('project_id')
            dev_username = request.POST.get('dev_username')
            user = User.objects.get(username=dev_username)
            project = Project.objects.get(id=project_id)
            project.dev.add(user)
            return JsonResponse({'status': 200})
        except:
            return JsonResponse({'status': 400})


def issueView(request):
    return render(request, 'core/bug-issue.html')


def taskView(request):
    return render(request, 'core/task.html')
