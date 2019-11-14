from django.db import models
from users.models import *
from django.contrib.auth.models import User


# Create your models here.

class Drawing(models.Model):
    drawing_name = models.CharField(blank=False, max_length=120)
    drawing_data = models.TextField(blank=False, max_length=1792)
    drawing_created = models.DateTimeField( auto_now_add=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE)




class SubmissionsHistory(models.Model):
    accepted = models.BooleanField(default=False)
    submission_datetime = models.DateTimeField(auto_now_add=False)
    drawing = models.ForeignKey(Drawing, on_delete= models.CASCADE)

class NewSubmission(models.Model):
    submission = models.OneToOneField(SubmissionsHistory, on_delete=models.CASCADE)
    viewed_by_admin = models.BooleanField(default=False)


class CurrentlyShowing(models.Model):
    submission = models.OneToOneField(SubmissionsHistory, on_delete=models.CASCADE)



