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
