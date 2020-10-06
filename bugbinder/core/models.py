from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=1000)
    bugs = models.PositiveIntegerField(default=0)
    assigned = models.PositiveIntegerField(default=0)
    fixed = models.PositiveIntegerField(default=0)
    task = models.ManyToManyField("Task", related_name="bugs",  blank=True)
    dev = models.ManyToManyField(
        User, related_name="developer",  blank=True)

    def __str__(self):
        return self.title


class Task(models.Model):
    class Meta:
        ordering = ['assigned', '-date']
    title = models.CharField(max_length=300)
    reproduce = models.CharField(max_length=1000, null=True, blank=True)
    environment = models.CharField(max_length=1000, null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    dev = models.ForeignKey(User, null=True, blank=True,
                            on_delete=models.SET_NULL)
    done = models.BooleanField(default=False)
    assigned = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
