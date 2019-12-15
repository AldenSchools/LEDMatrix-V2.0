"""
    This file handles all operatins related to arduino

"""


def send_data_to_arduino(drawing_data):
    ser = serial.Serial(
         port='/dev/ttyACM0', 
         baudrate = 9600,
         parity=serial.PARITY_NONE,
         stopbits=serial.STOPBITS_ONE,
         bytesize=serial.EIGHTBITS,#
 	timeout=None
 )
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
        
   
    stringSend = drawing_data.replace("#","")
    stringSend = stringSend.replace("4c4c4c","000000")
    
    newString = ""
    i = 0
    while( i < len(stringSend)-1 ):
        newString = newString + stringSend[i+2] + stringSend[i+3] + stringSend[i] + stringSend[i+1] + stringSend[i+4] + stringSend[i+5]
        i = i + 6
    
    newestString = ""
    j = 0 
    r = 1 
    while( j < len(newString)-1):  
        if( r%2 != 0 ): 
            newestString = newestString + newString[j+90:j+96] + newString[j+84:j+90] + newString[j+78:j+84] + newString[j+72:j+78] + newString[j+66:j+72] + newString[j+60:j+66] + newString[j+54:j+60] + newString[j+48:j+54] + newString[j+42:j+48] + newString[j+36:j+42] + newString[j+30:j+36] + newString[j+24:j+30] + newString[j+18:j+24] + newString[j+12:j+18] + newString[j+6:j+12] + newString[j:j+6]
        else:
            newestString = newestString + newString[j:j+96]
        j = j + 96
        r = r + 1
    
        
    ser.write(str.encode(newestString))
    #Write your code here
    #pass




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