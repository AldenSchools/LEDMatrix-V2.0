from pages.models import CurrentlyShowing
from .data_send_arduino import send_data_to_arduino
from threading import Thread
import time 

TIME_INTERVAL_SECS = 3
def schedule_drawings():
    while True:
        curr_showing = CurrentlyShowing.objects.all()
        for i in range( len(curr_showing)):
            drawing_data = curr_showing[i].submission.drawing.drawing_data
            send_data_to_arduino(drawing_data)
            print("\n Sending Data to arduino\n"+drawing_data )
            time.sleep(TIME_INTERVAL_SECS)
        if len(curr_showing) == 0:
            print("nothing to show")
            time.sleep(20)

def start_tasks():
    thread = Thread(target=schedule_drawings)
    thread.start()

