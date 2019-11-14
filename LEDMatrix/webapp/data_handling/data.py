import datetime
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pages.models import *
from django.contrib.auth.models import User
from users.forms import SubmitDrawingForm, SaveDrawingForm, DeleteDrawingForm, CreateDrawingForm

@login_required
def fetch_drawing_data(request):
    drawing_id = request.GET.get('drawing',None)
    drawing_data = Drawing.objects.get(pk=drawing_id).drawing_data
    
    
    matrix_data = drawing_data_as_list(drawing_data)

    data = {
        'drawing_data': matrix_data,
        'drawing_id':drawing_id,
    }
    return JsonResponse(data)

@login_required
def new_drawing(request):
    print("atempting to create a drawing")
    drawing_id = -1
    if(request.method == "POST"):
        form = CreateDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_name = form.cleaned_data.get('drawing_name')
            drawing = Drawing.objects.create(drawing_name=drawing_name, drawing_data=default_drawing_data(), drawing_created=datetime.datetime.now(), user=request.user)
            drawing_id = drawing.id

    return JsonResponse({"new_drawing_id":drawing_id})


    

@login_required
def save_drawing(request):
    pass

@login_required
def submit_drawing(request):
    success = False
    if(request.method == "POST"):
        form = SubmitDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_id = form.cleaned_data.get('drawing_id')
            drawing = Drawing.objects.get(pk=drawing_id)
            new_sub = SubmissionsHistory.objects.create(drawing=drawing)
            NewSubmission.objects.create(submission=new_sub)
            success = True
    
    return JsonResponse({"success":success})
        


@login_required
def delete_drawing(request):
    if(request.method == "POST"):
        form = DeleteDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_id = form.cleaned_data.get('drawing_id')
            
            if(drawing_id < 0):
                messages.error(request, f"could not delete")
            else:
                drawing = Drawing.objects.filter(pk=drawing_id)
                if(drawing[0].user == request.user):
                    #messages.success(request, f"Drawing {drawing[0].drawing_name} deleted")
                    drawing.delete()
                    print("deleted")


    return JsonResponse({"deleted_drawing_id":drawing_id})



##### HELPER FUNCTIONS #####
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

def default_drawing_data():
    data =""
    for i in range(0,256):
        data = data+ "#4C4C4C"
    
    return data