#include <Adafruit_DotStar.h>

#define NUMPIXELS 256 // Number of LEDs in strip
 
// Here's how to control the LEDs from any two pins:
//#define DATAPIN    4
//#define CLOCKPIN   5
//Adafruit_DotStar strip = Adafruit_DotStar(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BRG);

//Else if using standard spi & clk pins use this
Adafruit_DotStar strip = Adafruit_DotStar(NUMPIXELS, DOTSTAR_BRG);

uint32_t serialData = 0;   //Holds a byte of incoming data
char colorInt[8] = {0};   //Holds the whole string of data
int ledPos = -5;          //Current Led to be illuminated, -5 because some random serial data gets sent at startup when using adafruit metro express(for reasons unknown, doesnt happen on arduinos)
int strPos = 0;              //position of colorInt to place incoming byte at

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off' 
  strip.setBrightness(24);    //Birghtness from 0-255
  Serial.begin(9600); 
}

void loop() {
 if (Serial.available())
       {//if serial data receivied
              serialData = Serial.read();      //Read incoming byte
               
              
              if(serialData != 10){       //arduino terminal sends 10 at end of string so check for that, can be changed to whatever char marks end of a color's data
                colorInt[strPos++] = serialData; 
              }

            
              if(strPos >= 6){      //if end found, then turn hex string to hex number, set color at position, reset variables as needed
             // Serial.print("I received: ");     //Display individual bytes, for testing purposes
             // Serial.println(strtoul(colorInt,NULL,16), HEX);
              //Serial.println(strtoul(colorInt,NULL,16));
              strip.setPixelColor(ledPos++,strtoul(colorInt,NULL,16));
              if(ledPos >= 256){ledPos = 0;}
              for(int i = 0; i < 8; i++)colorInt[i] = 0;          //reset string for led's color
              strPos = 0;
              }
       }//end of serial data 
       strip.show();
}
