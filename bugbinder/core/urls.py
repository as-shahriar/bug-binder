from django.urls import path, include
from core import views
urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
    path('issue/', views.issueView, name="issue"),
    path('project/<int:id>', views.projectView, name="project"),
    path('task/', views.taskView, name="task"),
    path('assign/', views.assign)

]
