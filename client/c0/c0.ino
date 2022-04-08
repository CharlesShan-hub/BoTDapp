#include "setting.h"
#include "BoT.h"

void setup(void){
  pinMode(A0, INPUT);
  pinMode(D2, OUTPUT);

  // 初始化(串口同步, EPROM初始化, 连接Wi-Fi, 设备登录)
  BoT_init();

  // 进行事件类型
  BoT_doAuthEventType("Light",2);
}

bool need_auth = true;
void loop(void){
  Serial.println(analogRead(A0));
  if(analogRead(A0)<900){
    if(need_auth){
      BoT_request("Light",2);
      need_auth = false;
    }
    digitalWrite(D2, LOW);
  }else{
    digitalWrite(D2, HIGH);
    need_auth = true;
  }
  delay(500);
}
