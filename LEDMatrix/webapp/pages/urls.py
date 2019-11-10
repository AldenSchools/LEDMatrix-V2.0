from django.urls import path, include
from .views import home_veiw, create_veiw, admin_dash_veiw, about_view

urlpatterns = [
    path('', home_veiw, name="home_view"),
    path('create/', create_veiw, name="create_view"),
    path('admin-dash/', admin_dash_veiw, name="admin_dash_view"),
    path('about/', about_view, name="about_view"),
    
]