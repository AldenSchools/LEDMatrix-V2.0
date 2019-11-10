from django.shortcuts import render
from users.forms import *
from users.views import *

# Create your views here.

def home_veiw(request):
    register_form = check_for_user_registration(request)
    login_form = check_for_user_login(request)

    context = {
        "login_form":login_form,
        "register_form":register_form,
    }
    return render(request, "home.html", context)

def create_veiw(request):
    register_form = check_for_user_registration(request)

    context = {
        "login_form":UserLoginForm(),
        "register_form":register_form,
    }

    return render(request, "matrix.html", context)


def admin_dash_veiw(request): 
    return render(request, "admin-dashboard.html", {})


def about_view(request):
    

    context = {
        "login_form":UserLoginForm(),
        "register_form":UserRegisterForm(),
    }
    return render(request, "about.html", context)

