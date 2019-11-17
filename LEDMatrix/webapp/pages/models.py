from django.db import models
from users.models import *
from django.contrib.auth.models import User
from django.utils.timezone import now


# Create your models here.

class Drawing(models.Model):
    drawing_name = models.CharField(blank=False, max_length=120)
    drawing_data = models.TextField(blank=False, max_length=1792)
    drawing_created = models.DateTimeField( auto_now_add=True)
    last_update = models.DateTimeField( auto_now=True)
    accepted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)




class SubmissionsHistory(models.Model):
    submission_datetime = models.DateTimeField(auto_now_add=True)
    drawing = models.ForeignKey(Drawing, on_delete= models.CASCADE)

class NewSubmission(models.Model):
    submission = models.OneToOneField(SubmissionsHistory, on_delete=models.CASCADE)

class CurrentlyShowing(models.Model):
    submission = models.OneToOneField(SubmissionsHistory, on_delete=models.CASCADE)



