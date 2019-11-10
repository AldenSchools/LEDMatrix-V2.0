from django.shortcuts import render

# Create your views here.

def user_login_veiw(request):
    return render(request, "auth/user-login.html", {})

def user_register_view(request):
    return render(request, "auth/user-register.html", {})
     
def admin_login_veiw(request):
    return render(request, "auth/admin-login.html", {})
    
def logout_view(request):
    return render(request, "auth/logout.html", {})



