from django.db import models
from users.models import *


# Create your models here.

class Drawing(models.Model):
    drawing_name = models.CharField(blank=False, max_length=120)
    drawing_created = models.DateTimeField( auto_now_add=True)
    drawing_data = models.CharField(blank=False, max_length=1792)

    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)




class SubmissionHistory(models.Model):
    submission_datetime = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    drawing = models.ForeignKey(Drawing, on_delete= models.CASCADE)

class CurrentSubmissions(models.Model):
    sumbissions = models.OneToOneField(SubmissionHistory, on_delete=models.CASCADE)
    viewed_by_admin = models.BooleanField(default=False)



