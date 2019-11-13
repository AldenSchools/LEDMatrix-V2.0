from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from pages.models import *

# Create your views here.

@login_required
def fetch_drawing_data(request):
    drawing_id = request.GET.get('drawing',None)
    drawing_data = Drawing.objects.get(pk=drawing_id).drawing_data
    
    
    matrix_data = drawing_data_as_list(drawing_data)

    data = {
        'drawing_data': matrix_data
    }
    return JsonResponse(data)

@login_required
def new_drawing(request):
    
    if(request.user.is_authenticated):
        drawing = Drawing.objects.create(drawing_name="", drawing_data="", drawing_created="", request.user)
        

    

@login_required
def save_drawing(request):
    pass

@login_required
def submit_drawing(request):
    pass

@login_required
def delete_drawing(request):
    pass


def drawing_data_as_list(drawing_data):
    matrix_list = []
    for row in range(0,16):
        matrix_list.append(['']* 16) 
        current_row = drawing_data[0:113]
        matrix_list[row] = current_row.split("#")
        drawing_data = drawing_data[112:]

    print(matrix_list)

    for row in range(0,len(matrix_list)):
        del matrix_list[row][0]
        if(row != len(matrix_list)-1):
             del matrix_list[row][-1] 
        for col in range(0,len(matrix_list[row])):
            matrix_list[row][col] = "#" + matrix_list[row][col]

    return matrix_list


 def drawing_data_list_as_string(matrix_data):
     drawing_data = ""
     for row in range(0, len(matrix_data)):
         for col in range(0, len(matrix_data[row])):
             drawing_data = drawing_data + matrix_data[row][col]
    
    return drawing_data