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


bool need_request = true;
void loop(void){
  if(analogRead(A0)<900){
    if(need_request){
      BoT_request("Light",2);
      need_request = false;
    }
    digitalWrite(D2, LOW);
  }else{
    digitalWrite(D2, HIGH);
    need_request = true;
  }
  delay(500);
}


void loop(void){
  if(analogRead(A0)<900){
    BoT_request_set("Light",2);
    digitalWrite(D2, LOW);
  }else{
    BoT_request_clear("Light");
    digitalWrite(D2, HIGH);
  }
  delay(500);
}

//  Serial.println(analogRead(A0));
