from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
from .forms import *

# Create your views here.

def user_login_veiw(request):
    return render(request, "auth/user-login.html", {})

def user_register_view(request):
    
    return render(request, "auth/user-register.html", {})
     
def admin_login_veiw(request):
    admin_login_form = handle_admin_login_form(request)
    return render(request, "auth/admin-login.html", {"form":admin_login_form})

@login_required 
def logout_view(request):
    logout(request)
    return redirect("/")

@login_required 
def block_user(request):
    success = False
    username = ""
    if(request.user.is_authenticated and request.user.has_perm('users.admin-dash')):
        username = request.POST.get('username',None)
        try:
            user = User.objects.get(username=username)
            userprofile = user.userprofile
            userprofile.is_blocked = True
            userprofile.save()
            user.save()
            success = True
        except User.DoesNotExist:
            print("user with username '"+username+"' does not exist")
    return JsonResponse({"success":success, "username":username})

@login_required 
def unblock_user(request):
    success = False
    username = ""
    if(request.user.is_authenticated and request.user.has_perm('users.admin-dash')):
        username = request.POST.get('username',None)
        try:
            user = User.objects.get(username=username)
            userprofile = user.userprofile
            userprofile.is_blocked = False
            userprofile.save()
            user.save()
            success = True
        except User.DoesNotExist:
            print("user with username '"+username+"' does not exist")
    return JsonResponse({"success":success, "username":username})

@login_required 
def remove_user(request):
    success = False
    username = ""
    if(request.user.is_authenticated and request.user.has_perm('users.admin-dash')):
        username = request.POST.get('username',None)
        try:
            user = User.objects.get(username=username)
            userprofile = user.userprofile
            userprofile.delete()
            user.delete()
            success = True
        except (User.DoesNotExist, UserProfile.DoesNotExist) as e:
            print("user with username '"+username+"' does not exist or userprofile does not exist")
    return JsonResponse({"success":success, "username":username})

















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
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a success page.
                
                check_for_userprofile(user)
                messages.success(request, f'Hi {username}!')
                return redirect('/admin-dash')
            else:
                # Return an 'invalid login' error message.
                print("here 1")
                messages.error(request, f"Could not log in with username '{username}''")
                    
    else: 
        form = AdminLoginForm()

    return form

def check_for_userprofile(user):
    try:
        UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        print("admin does not have a user profile creating one now")
        profile = UserProfile.objects.create(user=user)
        user.userprofile = profile