from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    number_submissions = models.PositiveIntegerField(default=0)
    number_accepted_submissions = models.PositiveIntegerField(default=0)

    permissions = [
        ("admin_dash", "Can access the admin dashboard"),
    #    ("close_task", "Can remove a task by setting its status as closed"),
         ]

class Prefrences():
    pass


