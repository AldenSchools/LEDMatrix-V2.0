from django.shortcuts import render
from users.forms import *

# Create your views here.

def home_veiw(request):
    

    context = {
        "login_form":UserLoginForm(),
        "register_form":UserRegisterForm(),
    }
    return render(request, "home.html", context)

def create_veiw(request):
    

    context = {
        "login_form":UserLoginForm(),
        "register_form":UserRegisterForm(),
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

