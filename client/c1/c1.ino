#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>   // 使用WiFiMulti库 
#include <ArduinoJson.h>

#define buttonPin D3            // 按钮引脚D3

ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是 'wifiMulti'

bool buttonState;       //存储客户端按键控制数据
float clientFloatValue; //存储客户端发送的浮点型测试数据
int clientIntValue;     //存储客户端发送的整数型测试数据

const char* host = "192.168.110.117";    // 即将连接服务器网址/IP
const int httpPort = 80;               // 即将连接服务器端口

typedef struct{
  String id;
  String password;
  String index;
  bool auth;
}DeviceInfo;
DeviceInfo deviceInfo = {"","","",false};

void setup(void){
  Serial.begin(9600);                  // 启动串口通讯
  wifiMulti.addAP("shan", "dukesaw7"); 
  wifiMulti.addAP("KIM", "dukesaw7");
  Serial.println("Connecting ...");    // 则尝试使用此处存储的密码进行连接。
  
  while (wifiMulti.run() != WL_CONNECTED) { // 尝试进行wifi连接。
    delay(300);
    Serial.print('.');
  }

  // WiFi连接成功后将通过串口监视器输出连接成功信息 
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());              // 通过串口监视器输出连接的WiFi名称
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());           // 通过串口监视器输出ESP8266-NodeMCU的IP

  // ping
  devicePing();
  delay(60000);
  
  // 进行设备登陆
  if(deviceInfo.auth==false){
    //deviceAddRequest();
    delay(10000);
  }
}

void loop(void){
 // 获取按键引脚状态
 buttonState = digitalRead(buttonPin); 
 
 // 改变测试用变量数值用于服务器端接收数据检测
 clientFloatValue += 1.5;
 clientIntValue += 2;

 // 发送请求
 wifiClientRequest();
 delay(1000);
}

void devicePing(){
    WiFiClient client;  

  // 将需要发送的数据信息放入客户端请求
  String url = "/update?"\
               "account="\
               "&password="\
               "&index="\
               "&type=ping"\
               "&info=Esp8266"\
               "&name=Esp8266";
                         
  // 建立字符串，用于HTTP请求
  String httpRequest =  String("GET ") + url + " HTTP/1.1\r\n" +
                        "Host: " + host + "\r\n" +
                        "Connection: close\r\n" +
                        "\r\n";
                        
    if (client.connect(host, 80)){
    Serial.println(" Success!");
 
    // 向服务器发送http请求信息
    client.print(httpRequest);
    Serial.println("Sending request: ");
    Serial.println(httpRequest);  
 
    // 获取并显示服务器响应状态行 
    String status_response = client.readStringUntil('\n');
    Serial.print("status_response: ");
    Serial.println(status_response);
 
    // 使用find跳过HTTP响应头
    if (client.find("\r\n\r\n")) {
      Serial.println("Found Header End. Start Parsing.");
    }
    //Serial.println(client);
    parseInfo(client); 
  }
  else {
    Serial.println(" connection failed!");
  } 

  client.stop(); 
}

void deviceAddRequest(){
    WiFiClient client;  

  // 将需要发送的数据信息放入客户端请求
  String url = "/update?"\
               "id="\
               "&password="\
               "&index="\
               "&type=addDevice"\
               "&info=Esp8266"\
               "&name=Esp8266";
                         
  // 建立字符串，用于HTTP请求
  String httpRequest =  String("GET ") + url + " HTTP/1.1\r\n" +
                        "Host: " + host + "\r\n" +
                        "Connection: close\r\n" +
                        "\r\n";
                        
  Serial.print("Connecting to "); 
  Serial.print(host); 
  
  if (client.connect(host, httpPort)) {  //如果连接失败则串口输出信息告知用户然后返回loop
    Serial.println(" Sucess");
    
    client.print(httpRequest);          // 向服务器发送HTTP请求
    Serial.println("Sending request: ");// 通过串口输出HTTP请求信息内容以便查阅
    Serial.println(httpRequest);        
  } else{
    Serial.println(" failed");
  }
  
  client.stop(); 
  /*WiFiClient client; 
  // 将需要发送的数据信息放入客户端请求
  String url = "/update?type=addDevice"\
               "&info=The First Esp8266-test-device"\
               "&name=Esp8266";
                         
  // 建立字符串，用于HTTP请求
  String httpRequest =  String("GET ") + url + " HTTP/1.1\r\n" +
                        "Host: " + host + "\r\n" +
                        "Connection: close\r\n" +
                        "\r\n";
  Serial.print("Connecting to "); 
  Serial.print(host); 
  
  if (client.connect(host, httpPort)) {  //如果连接失败则串口输出信息告知用户然后返回loop
    Serial.println(" Sucess");
    
    client.print(httpRequest);          // 向服务器发送HTTP请求
    Serial.println("Sending request: ");// 通过串口输出HTTP请求信息内容以便查阅
    Serial.println(httpRequest);        
  } else{
    Serial.println(" failed");
  }
  
  client.stop(); */ 
}

void wifiClientRequest(){
  WiFiClient client;  

  // 将需要发送的数据信息放入客户端请求
  String url = "/update?float=" + String(clientFloatValue) + 
               "&int=" + String(clientIntValue) +
               "&button=" + String(buttonState);
                         
  // 建立字符串，用于HTTP请求
  String httpRequest =  String("GET ") + url + " HTTP/1.1\r\n" +
                        "Host: " + host + "\r\n" +
                        "Connection: close\r\n" +
                        "\r\n";
                        
  Serial.print("Connecting to "); 
  Serial.print(host); 
  
  if (client.connect(host, httpPort)) {  //如果连接失败则串口输出信息告知用户然后返回loop
    Serial.println(" Sucess");
    
    client.print(httpRequest);          // 向服务器发送HTTP请求
    Serial.println("Sending request: ");// 通过串口输出HTTP请求信息内容以便查阅
    Serial.println(httpRequest);        
  } else{
    Serial.println(" failed");
  }

  // 获取并显示服务器响应状态行 
  String status_response = client.readStringUntil('\n');
  Serial.print("status_response: ");
  Serial.println(status_response);

  // 使用find跳过HTTP响应头
  if (client.find("\r\n\r\n")) {
    Serial.println("Found Header End. Start Parsing.");
  }
    
  
  client.stop();                         
}


void parseInfo(WiFiClient client){
  String info_name_str;
  bool d3_bool;
  
  const size_t capacity = JSON_OBJECT_SIZE(1) + 3*JSON_OBJECT_SIZE(3) + 140;
  DynamicJsonDocument doc(capacity);
   
  deserializeJson(doc, client);
  
  JsonObject info = doc["info"];
  if(info){
    Serial.println("Server Json has info: true");
    const char* info_name = info["name"]; // "taichimaker"
    const char* info_url = info["url"]; // "www.taichi-maker.com"
    const char* info_email = info["email"]; // "taichimaker@163.com"
    info_name_str =  info["name"].as<String>();
    Serial.print("info_name_str = ");Serial.println(info_name_str);
  } else {
    Serial.println("Server Json has info: false");
  }
  
  JsonObject digital_pin = doc["digital_pin"];
  if (digital_pin){
    Serial.println("Server Json has digital_pin: true");
    const char* digital_pin_d1 = digital_pin["d1"]; // "1"
    const char* digital_pin_d2 = digital_pin["d2"]; // "0"
    const char* digital_pin_d3 = digital_pin["d3"]; // "1"
    d3_bool = digital_pin["d3"].as<int>();
    Serial.print("d3_bool = ");Serial.println(d3_bool);
  } else {
    Serial.println("Server Json has digital_pin: false");
  }
  
  const char* analog_pin_a0 = doc["analog_pin"]["a0"]; // "500"
  if (analog_pin_a0){
    Serial.println("Server Json has analog_pin_a0: true");
  } else {
    Serial.println("Server Json has analog_pin_a0: false");
  }
  
  d3_bool == 0 ? digitalWrite (LED_BUILTIN, LOW) : digitalWrite(LED_BUILTIN, HIGH);
}
