#include "setting.h"
#include "BoT.h"

void setup(void){
  // 启动串口通讯
  Serial.begin(9600);
  while (!Serial) continue;
  EEPROM.begin(256);
  
  // 连接Wi-Fi
  BoT_connectWiFi();
  
  // 进行设备登陆
  BoT_doAuth();
}

void loop(void){
 // 发送请求
 Serial.println("something.....");
 delay(1000);
}
