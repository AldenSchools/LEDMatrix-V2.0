from pages.models import CurrentlyShowing
from users.models import LEDMatrixSettings
from .data_send_arduino import send_data_to_arduino
from threading import Thread
import time 

"""
TODO: Check if the time is in range before displaying if user has set one.
"""
def schedule_drawings():
    while True:
        curr_showing = CurrentlyShowing.objects.all()
        try:
            marix_settings = LEDMatrixSettings.objects.get(pk=1)
        except LEDMatrixSettings.DoesNotExist:
            marix_settings = LEDMatrixSettings.objects.create()
        if(marix_settings.led_matrix_on):
            for i in range( len(curr_showing)):
                if(i < marix_settings.currently_showing_limit):
                    drawing_data = curr_showing[i].submission.drawing.drawing_data
                    send_data_to_arduino(drawing_data)
                    print("\n Sending Data to arduino\n"+drawing_data )
                    time.sleep(marix_settings.time_between_drawings)
            if len(curr_showing) == 0:
                print("matrix is on but has nothing to show, checking again in 30 seconds")
                time.sleep(30)
        else:
            print("the matrix is set to off, checking again in 30 seconds")
            time.sleep(30)

def start_tasks():
    thread = Thread(target=schedule_drawings)
    thread.start()

