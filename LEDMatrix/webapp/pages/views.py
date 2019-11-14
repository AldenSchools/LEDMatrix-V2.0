from django.shortcuts import render
from django.contrib.auth.models import User
from data_handling.data import save_drawing, delete_drawing, submit_drawing 
from .models import *
from users.forms import *
from users.views import *

# Create your views here.

def home_veiw(request):
    context = {}
    if( not request.user.is_authenticated):
        context['register_form'] = handle_user_registration_form(request)
        context['login_form'] = handle_user_login_form(request)

    return render(request, "home.html", context)

def create_veiw(request):

    context = {}
    if( not request.user.is_authenticated):
        context['register_form'] = handle_user_registration_form(request)
        context['login_form'] = handle_user_login_form(request)
    else:
        context['drawings'] = Drawing.objects.filter(user__username=request.user.username)
        context['delete_form'] = DeleteDrawingForm()
        context['save_form'] = SaveDrawingForm()
        context['submit_form'] = SubmitDrawingForm()
        context['new_drawing_form'] = CreateDrawingForm()              
        

    return render(request, "matrix.html", context)

@login_required
def admin_dash_veiw(request):
    if(not request.user.has_perm("users.admin_dash") and not request.user.is_authenticated):
        return redirect("/")
    
    currently_showing = CurrentlyShowing.objects.all()
    new_submissions = NewSubmission.objects.all()
    submissions_history = SubmissionsHistory.objects.all()
    users = User.objects.all()

    context = { 
        "currently_showing":currently_showing, 
        "new_submissions":new_submissions, 
        "submissions_history":submissions_history, 
        "users":users,
    }
    return render(request, "admin-dashboard.html", context)


def about_view(request):
    context = {}
    if( not request.user.is_authenticated):
        context['register_form'] = handle_user_registration_form(request)
        context['login_form'] = handle_user_login_form(request)

    return render(request, "about.html", context)


