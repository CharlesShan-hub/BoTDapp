#include "setting.h"
#include "BoT.h"

void setup(void){
  pinMode(A0, INPUT);
  pinMode(D2, OUTPUT);
  // Init
  BoT_init();
  // Add Event Type
  BoT_doAuthEventType("Light",2);
}

void loop(void){
  Serial.println(analogRead(A0));
  if(analogRead(A0)<900){
    BoT_request_set("Light",2);
    digitalWrite(D2, LOW);
  }else{
    BoT_request_clear("Light");
    digitalWrite(D2, HIGH);
  }
  delay(500);
}
