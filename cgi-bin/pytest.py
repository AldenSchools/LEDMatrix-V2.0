#!/usr/bin/env python

import cgi
import cgitb
cgitb.enable()

import sys
import time
import serial

#print 'Content-type: text/html\r\n\r\n'


ser = serial.Serial(
        port='/dev/ttyACM0', 
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,#
	timeout=None
)

#ser = serial.Serial()
#ser.port = '/dev/ttyACM0'
#print(ser.name)         # check which port was really used
#ser.write("0000FF")
data= cgi.FieldStorage()

# Get data from fields
output = data.getvalue("param")
ser.write(output)
#ser.write(sys.argv[1])     # write a string
#ser.close()             # close port
