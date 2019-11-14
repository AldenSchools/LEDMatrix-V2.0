from django.urls import path, include
from .data import  fetch_drawing_data, new_drawing, save_drawing, submit_drawing, delete_drawing

urlpatterns = [
    
    path('fetch-drawing-data/', fetch_drawing_data, name="fetch_drawing_data"),
    path('new-drawing/', new_drawing, name="new_drawing"),
    path('save-drawing/', save_drawing, name="save_drawing"),
    path('submit-drawing/', submit_drawing, name="submit_drawing"),
    path('delete-drawing/', delete_drawing, name="delete_drawing"),
    
]