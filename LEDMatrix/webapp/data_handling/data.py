from django.utils import timezone
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pages.models import *
from django.contrib.auth.models import User
from users.forms import SubmitDrawingForm, SaveDrawingForm, DeleteDrawingForm, CreateDrawingForm, LEDMatrixSettingsForm


@login_required
def fetch_drawing(request):
    if(not request.user.is_authenticated):
        return JsonResponse({})
    
    drawing_id = request.GET.get('drawing',None)
    
    data = fetch_drawing_data(drawing_id)
    return JsonResponse(data)

@login_required
def fetch_drawing_admin(request):
    submission_id = request.GET.get('submission',None)
    if(not request.user.is_authenticated or not request.user.has_perm('users.admin-dash')):
        return JsonResponse({})

    drawing_id = -1
    try:
        drawing_id = SubmissionsHistory.objects.get(pk=submission_id).drawing.id;
    except SubmissionsHistory.DoesNotExist:
        print("could not fetch drawing id in admin dashboard")
    data = fetch_drawing_data(drawing_id)
    data['delete_from_new_subms_list_success'] = remove_from_new_subms_list(submission_id)

    return JsonResponse(data)
    




@login_required
def new_drawing(request):
    print("atempting to create a drawing")
    drawing_id = -1
    drawing_name = ""
    if(request.method == "POST"):
        form = CreateDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_name = form.cleaned_data.get('drawing_name')
            drawing_data = form.cleaned_data.get('drawing_data')
            print(drawing_name)
            print(drawing_data)
            if drawing_data is None or drawing_data == "":
                drawing_data = default_drawing_data()
            drawing = Drawing.objects.create(drawing_name=drawing_name, drawing_data=drawing_data ,user=request.user)
            drawing_id = drawing.id
        else:
            print("form is not valid")

    return JsonResponse({"new_drawing_id":drawing_id, "drawing_name":drawing_name})


    

@login_required
def save_drawing(request):
    success = False
    if(request.method == "POST"):
        form = SaveDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_id = form.cleaned_data.get('drawing_id')
            new_drawing_data = form.cleaned_data.get('new_drawing_data')
            try:
                drawing = Drawing.objects.get(pk=drawing_id)
                drawing.drawing_data = new_drawing_data;
                drawing.save()
                success = True
            except Drawing.DoesNotExist:
                print("Could not save because drawing does not exist")

    return JsonResponse({"success":success})

@login_required
def submit_drawing(request):
    success = False
    if(request.method == "POST"):
        form = SubmitDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_id = form.cleaned_data.get('drawing_id')
            try:
                drawing = Drawing.objects.get(pk=drawing_id)
                try:
                    check_sub_his = SubmissionsHistory.objects.filter(drawing__id = drawing_id)[0]
                    NewSubmission.objects.create(submission=check_sub_his)
                except (SubmissionsHistory.DoesNotExist, IndexError) as e:
                    new_sub = SubmissionsHistory.objects.create(drawing=drawing)
                    NewSubmission.objects.create(submission=new_sub)
                user_profile = drawing.user.userprofile
                user_profile.number_submissions = user_profile.number_submissions + 1
                user_profile.save()
                success = True
            except Drawing.DoesNotExist:
                print("Could not submit because drawing does not exist")
            
    
    return JsonResponse({"success":success})
        


@login_required
def delete_drawing(request):
    if(request.method == "POST"):
        form = DeleteDrawingForm(request.POST)
        if(form.is_valid()):
            drawing_id = form.cleaned_data.get('drawing_id')
            
            if(drawing_id >= 0):
                try:
                    drawing = Drawing.objects.get(pk=drawing_id)
                    if(drawing.user == request.user):
                        #messages.success(request, f"Drawing {drawing[0].drawing_name} deleted")
                        drawing.delete()
                        print("deleted")
                except Drawing.DoesNotExist:
                    print("Could not delete because drawing does not exist")


    return JsonResponse({"deleted_drawing_id":drawing_id})

@login_required
def add_to_curr_showing_list(request):
    success = False
    limit_reached = False
    if(request.user.is_authenticated and request.user.has_perm('users.admin-dash')):
        submission_id = request.POST.get('submission',None)

        
        try:
            showing_limit = LEDMatrixSettings.objects.get(pk=1).currently_showing_limit
        except LEDMatrixSettings.DoesNotExist:
            LEDMatrixSettings.objects.create()
            showing_limit = LEDMatrixSettings.objects.get(pk=1).currently_showing_limit

        try:
            submission = SubmissionsHistory.objects.get(pk=submission_id)
            try:
                try_get_curr_showin_sub = CurrentlyShowing.objects.filter(submission__id = submission_id)[0]
                print("already in currently showing list")
                success = True
            except (CurrentlyShowing.DoesNotExist, IndexError) as e:
                print("not in currently showing list moving it there now ")
                if(CurrentlyShowing.objects.all().count() == showing_limit):
                    limit_reached = True
                    print("limit has been reached cant add more")
                else:
                    CurrentlyShowing.objects.create(submission=submission)
                    remove_from_new_subms_list(submission_id)
                    try:
                        user_profile = submission.drawing.user.userprofile
                        user_profile.number_accepted_submissions = user_profile.number_accepted_submissions +1
                        user_profile.save()
                    except UserProfile.DoesNotExist:
                        print("UserProfile does not exist for this user")
                    success = True
                    
        except SubmissionsHistory.DoesNotExist:
            print("Could not add to showing list because submission does not exist")

    return JsonResponse({"success":success, "limit_reached":limit_reached})
            


@login_required
def remove_from_showing_list(request):
    success = False
    if(request.user.is_authenticated and request.user.has_perm('users.admin-dash')):
        submission_id = request.POST.get('submission',None)
        try:
            showing_submission = CurrentlyShowing.objects.filter(submission__id=submission_id)[0]
            showing_submission.delete()
            success = True
        except (CurrentlyShowing.DoesNotExist, IndexError) as e:
            print("Could not remove form showing list because this submission does not exist.")
    return JsonResponse({"success":success})


def remove_from_new_subms_list(submission_id):
    success = False
    try:
        new_submission = NewSubmission.objects.filter(submission__id=submission_id)[0]
        new_submission.delete()
        success = True
    except (NewSubmission.DoesNotExist, IndexError) as e:
        print("Could not remove form new submissions list because, This submission does not exist")

    return success


def update_matrix_settings(request):
    success = False
    drawing_delay_too_short = False
    if(request.user.is_authenticated and request.user.has_perm("users.admin-dash")):
        reset_default = request.POST.get('reset-default', None)
        
        if(reset_default != None):
            set_matrix_defaults()
            success = True
        else:
            form = LEDMatrixSettingsForm(request.POST)
            if(form.is_valid()):
                led_matrix_on = form.cleaned_data.get('led_matrix_on')
                led_on_off_time_enabled = form.cleaned_data.get('led_on_off_time_enabled')
                led_matrix_on_time = form.cleaned_data.get('led_matrix_on_time')
                led_matrix_off_time = form.cleaned_data.get('led_matrix_off_time')
                time_between_drawings = form.cleaned_data.get('time_between_drawings')
                currently_showing_limit = form.cleaned_data.get('currently_showing_limit')
                try:
                    led_matrix_settings = LEDMatrixSettings.objects.get(pk=1)
                except LEDMatrixSettings.DoesNotExist:
                    led_matrix_settings = LEDMatrixSettings.objects.create()
                
                led_matrix_settings.led_matrix_on = led_matrix_on
                led_matrix_settings.led_on_off_time_enabled = led_on_off_time_enabled
                led_matrix_settings.led_matrix_on_time = led_matrix_on_time
                led_matrix_settings.led_matrix_off_time = led_matrix_off_time
                if(time_between_drawings < 3):
                    time_between_drawings = 3
                    drawing_delay_too_short = True
                led_matrix_settings.time_between_drawings = time_between_drawings
                led_matrix_settings.currently_showing_limit = currently_showing_limit
                led_matrix_settings.save()
                success = True

            

    return JsonResponse({"success":success, "drawing_delay_too_short":drawing_delay_too_short})

def set_matrix_defaults():
    try:
        led_matrix_settings = LEDMatrixSettings.objects.get(pk=1)
        led_matrix_settings.led_matrix_on = True
        led_matrix_settings.led_on_off_time_enabled = False
        led_matrix_settings.led_matrix_on_time = None
        led_matrix_settings.led_matrix_off_time = None
        led_matrix_settings.time_between_drawings = 10
        led_matrix_settings.currently_showing_limit = 10
    except LEDMatrixSettings.DoesNotExist:
        led_matrix_settings = LEDMatrixSettings.objects.create()

















##### HELPER FUNCTIONS #####
def fetch_drawing_data(drawing_id):
    drawing_data = ""
    try:
        drawing = Drawing.objects.get(pk=drawing_id)
        drawing_data = drawing.drawing_data
    except Drawing.DoesNotExist:
        print("Could not fetch drawing data because drawing does not exist")
    
    matrix_data = drawing_data_as_list(drawing_data)

    data = {
        'drawing_data': matrix_data,
        'drawing_id':drawing_id,
    }
    return data



def drawing_data_as_list(drawing_data):
    matrix_list = []
    for row in range(0,16):
        matrix_list.append(['']* 16) 
        current_row = drawing_data[0:113]
        matrix_list[row] = current_row.split("#")
        drawing_data = drawing_data[112:]

    

    for row in range(0,len(matrix_list)):
        del matrix_list[row][0]
        if(row != len(matrix_list)-1):
             del matrix_list[row][-1] 
        for col in range(0,len(matrix_list[row])):
            matrix_list[row][col] = "#" + matrix_list[row][col]
            
    
    print(matrix_list)
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


