from django.urls import path, include
from core import views
urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
    path('issue/', views.issueView, name="issue"),
    path('project/<int:id>', views.projectView, name="project"),
    path('task/', views.taskView, name="task"),
    path('assign/', views.assign),
    path('delete_task/', views.delete_task),
    path('delete_project/', views.delete_project),
    path('edit_project/', views.edit_project),
    path("search_dev/", views.search_dev),
    path("save_dev/", views.save_dev),
    path("remove_dev/", views.remove_dev),
    path("issue/public/<int:id>", views.publicissueView),


]
