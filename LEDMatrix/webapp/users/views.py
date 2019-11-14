from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import *

# Create your views here.

def user_login_veiw(request):
    return render(request, "auth/user-login.html", {})

def user_register_view(request):
    
    return render(request, "auth/user-register.html", {})
     
def admin_login_veiw(request):
    
    return render(request, "auth/admin-login.html", {"form":handle_admin_login_form})

@login_required 
def logout_view(request):
    logout(request)
    return redirect("/")




##### HELPER FUNCTIONS ########
def handle_user_registration_form(request):
    
    if (request.method == 'POST'):
        form = UserRegisterForm(request.POST)
        if (form.is_valid()):
            print("form is valid")
            form.save()
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('/create')
        else:
            messages.error(request, f'Form is not valid')
    else:
        print("form is not a POST ") 
        form = UserRegisterForm()
    
    return form

def handle_user_login_form(request):
    if (request.method == 'POST'):
        form = UserLoginForm(request.POST)
        if (form.is_valid()):
            username = form.cleaned_data.get('username')
            user = authenticate(request, username=username)
            if user is not None and not user.has_perm('users.admin-dash') and not user.is_superuser:
                login(request, user)
                # Redirect to a success page.
                messages.success(request, f'Hi {username}!')
                return redirect('/create')
            else:
                # Return an 'invalid login' error message.
                messages.error(request, f"Could not log in with username '{username}''")
                    
    else: 
        form = UserLoginForm()
    
    return form


def handle_admin_login_form(request):
    if (request.method == 'POST'):
        form = AdminLoginForm(request.POST)
        if (form.is_valid()):
            username = form.cleaned_data.get('acct_name')
            password = form.cleaned_data.get('password')
            print("usrname="+username)
            print("pass="+password)
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a success page.
                messages.success(request, f'Hi {username}!')
                return redirect('/admin-dash')
            else:
                # Return an 'invalid login' error message.
                print("here 1")
                messages.error(request, f"Could not log in with username '{username}''")
                    
    else: 
        form = AdminLoginForm()

    return form