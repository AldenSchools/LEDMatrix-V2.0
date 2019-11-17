from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    number_submissions = models.PositiveIntegerField(default=0)
    number_accepted_submissions = models.PositiveIntegerField(default=0)

   
class LEDMatrixSettings(models.Model):
    led_matrix_on = models.BooleanField(default=True)
    led_on_off_time_enabled = models.BooleanField(default=False)
    led_matrix_on_time = models.TimeField(default=timezone.now(), null=True, blank=True)
    led_matrix_off_time = models.TimeField(default=timezone.now(), null=True, blank=True)
    time_between_drawings = models.PositiveIntegerField(default=10)
    currently_showing_limit = models.PositiveIntegerField(default=10)


permissions = [
    ("admin_dash", "Can access the admin dashboard"),
#    ("close_task", "Can remove a task by setting its status as closed"),
]

