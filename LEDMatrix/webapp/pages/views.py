from django.shortcuts import render
from django.contrib.auth.models import User

from .models import *
from users.forms import *
from users.views import *

# Create your views here.

def home_veiw(request):
    register_form = handle_user_registration_form(request)
    login_form = handle_user_login_form(request)

    context = {
        "login_form":login_form,
        "register_form":register_form,
    }
    return render(request, "home.html", context)

def create_veiw(request):
    

    register_form = handle_user_registration_form(request)
    login_form = handle_user_login_form(request)

    if(request.user.is_authenticated):
        drawings = Drawing.objects.filter(user__username=request.user.username)


    context = {
        "drawings":drawings,
        "login_form":login_form,
        "register_form":register_form,
    }

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
    register_form = handle_user_registration_form(request)
    login_form = handle_user_login_form(request)

    context = {
        "login_form":UserLoginForm(),
        "register_form":UserRegisterForm(),
    }
    return render(request, "about.html", context)


