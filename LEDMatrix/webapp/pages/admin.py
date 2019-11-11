from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Drawing)
admin.site.register(SubmissionsHistory)
admin.site.register(NewSubmission)
admin.site.register(CurrentlyShowing)

