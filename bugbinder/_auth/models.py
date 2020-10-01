from django.db import models
from django.contrib.auth.models import User


class Code(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=33)

    def __str__(self):
        return self.user.username
