/**********************************************************************
项目名称/Project          : 零基础入门学用物联网
程序名称/Program name     : wifiServer_example
团队/Team                : 太极创客团队 / Taichi-Maker (www.taichi-maker.com)
作者/Author              : CYNO朔
日期/Date（YYYYMMDD）     : 20200521
程序目的/Purpose          : 
本实例用于演示如何使用WiFiServer库利用ESP8266开发板建立基本网络服务器。
-----------------------------------------------------------------------
修订历史/Revision History  
日期/Date    作者/Author      参考号/Ref    修订说明/Revision Description
-----------------------------------------------------------------------
本示例程序为太极创客团队制作的《零基础入门学用物联网》中示例程序。
该教程为对物联网开发感兴趣的朋友所设计和制作。如需了解更多该教程的信息，请参考以下网页：
http://www.taichi-maker.com/homepage/esp8266-nodemcu-iot/
***********************************************************************/
#include <ESP8266WiFi.h>

const char* ssid = "taichimaker";
const char* password = "12345678";

WiFiServer server(80);
 
void setup() {
  Serial.begin(9600);
  Serial.println();
  
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(F("."));
  }

  // WiFi连接成功后将通过串口监视器输出连接成功信息 
  Serial.println('\n');                     // WiFi连接成功后
  Serial.print("Connected to ");            // NodeMCU将通过串口监视器输出。
  Serial.println(WiFi.SSID());              // 连接的WiFI名称
  Serial.print("IP address:\t");            // 以及
  Serial.println(WiFi.localIP());           // NodeMCU的IP地址
 
  // 启动服务器
  server.begin();
}
 
void loop() {
  runServer();  // 运行服务器
}

void runServer(){
  // 建立WiFiClient对象用于处理客户端请求信息
  WiFiClient incomingClient = server.available();

  // 如果没有客户端请求信息，则“跳过”函数中后续程序内容
  if (!incomingClient) {
    return;
  }

  Serial.println("====Client  Connected===");

  // 通过串口监视器输出客户端请求信息
  String clientRequest = incomingClient.readString();
  Serial.print(clientRequest);

// 建立服务器响应信息
  String httpResponse =
        "HTTP/1.0 200 OK\r\n"
        "Connection: close\r\n"
        "Content-Type: text/plain;\r\n"
        "\r\n"
        "client_request_received";

  // 向客户端发送以上服务器响应信息
  incomingClient.print(httpResponse); 

  incomingClient.stop();  
  Serial.println("incomingClient stop");   
}
