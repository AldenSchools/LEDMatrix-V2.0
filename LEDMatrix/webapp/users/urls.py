from django.urls import path, include
from .views import user_login_veiw, admin_login_veiw, logout_view, user_register_view, block_user, remove_user

urlpatterns = [
    path('login/', user_login_veiw, name="user_login_veiw"),
    path('register/',user_register_view, name="user_register_view"),
    path('admin-dash/login', admin_login_veiw, name="admin_login_veiw"),
    path('logout/', logout_view, name="logout_view"),
    path('admin-dash/block', block_user, name="block_user"),
    path('admin-dash/remove', remove_user, name="remove_user"),

      
]