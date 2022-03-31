#include "setting.h"
#include "BoT.h"

void setup(void){
  // 初始化(串口同步, EPROM初始化, 连接Wi-Fi, 设备登录)
  BoT_init();

  // 进行事件申请
  BoT_request("Hello",3);
}

void loop(void){
 // 发送请求
 Serial.println("something.....");
 delay(1000);
}
