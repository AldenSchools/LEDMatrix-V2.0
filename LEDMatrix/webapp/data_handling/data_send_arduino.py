"""
    This file handles all operatins related to arduino

"""


def send_data_to_arduino(drawing_data):
    """
    Handles the sending of data to the arduino 

    'drawing_data' is a string representing the RGB values for 
    each LED row by row. That is the first 16 RGB values in the string 
    corresponds to the first row of the LED matrix the next 16 corresponds to 
    the row below the previous one and each row goes from left to right so...

    Row 1:  LED1   LED2  LED3  LED4  ... LED16
    Row 2:  LED17  LED18 LED19 LED20 ... LED32
    ...
    ...
    
    'drawing_data' reflects this in a continuous string of RGB values in a format of 
        '#ABCDEF#FFFFFF#000000#4C4C4C ...'
    where the hashtag denotes a new LED or value. Each group of 16 (112 characters) values is a row in the 
    led matrix.

        NOTE: 
            - A value is #112233 where the first byte represents red, the second Green, and third Blue (RGB)
              so if you need GRB or any other combination of this you can modify 'drawing_data' string before 
              sending to the Arduino.

            - This function is called often on a separate thread (every X seconds, user definable) so code accordingly.
    """

    #Write your code here
    pass







#################################################################

"""
    The code below is the old way of sending data to the arduino 
    and it is depreciated but could be used as reference. 
"""
#import sys
#import time
#import serial


#ser = serial.Serial(
#        port='/dev/ttyACM0', 
#        baudrate = 9600,
#        parity=serial.PARITY_NONE,
#        stopbits=serial.STOPBITS_ONE,
#        bytesize=serial.EIGHTBITS,#
#	timeout=None
#)

##ser = serial.Serial()
##ser.port = '/dev/ttyACM0'
##print(ser.name)         # check which port was really used
##ser.write("0000FF")
# data= cgi.FieldStorage()

##Get data from fields
#output = data.getvalue("param")
#ser.write(output)
##ser.write(sys.argv[1])     # write a string
##ser.close()             # close port