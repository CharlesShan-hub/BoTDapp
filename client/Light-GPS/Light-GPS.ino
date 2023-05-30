/*
#include "setting.h"
#include "BoT.h"

void setup()
{
  BoT_init();
}

void loop()
{
  Serial.println(BoT_position());
  //delay(10000);
}
*/

#include "setting.h"
#include "BoT.h"

void setup(void){
  pinMode(A0, INPUT);
  pinMode(D2, OUTPUT);
  digitalWrite(D2, HIGH);
  
  // Init
  BoT_init();
  // Add Event Type
  BoT_doAuthEventType("Light",2);
}

void loop(void){
  Serial.println(analogRead(A0));
  if(analogRead(A0)<900){
    if(BoT_request_set("Light",2))
      digitalWrite(D2, LOW);
  }else{
    BoT_request_clear("Light");
    digitalWrite(D2, HIGH);
  }
  Serial.println(BoT_position());
  delay(500);
}
