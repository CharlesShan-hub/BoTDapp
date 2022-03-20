#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>   // 使用WiFiMulti库 

#define buttonPin D3            // 按钮引脚D3

ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是 'wifiMulti'

bool buttonState;       //存储客户端按键控制数据
float clientFloatValue; //存储客户端发送的浮点型测试数据
int clientIntValue;     //存储客户端发送的整数型测试数据

const char* host = "192.168.110.116";    // 即将连接服务器网址/IP
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
  Serial.println("");

  pinMode(buttonPin, INPUT_PULLUP);    // 将按键引脚设置为输入上拉模式
  
  wifiMulti.addAP("shan", "dukesaw7"); // 将需要连接的一系列WiFi ID和密码输入这里
  //wifiMulti.addAP("ssid_from_AP_2", "your_password_for_AP_2"); // ESP8266-NodeMCU再启动后会扫描当前网络
  //wifiMulti.addAP("ssid_from_AP_3", "your_password_for_AP_3"); // 环境查找是否有这里列出的WiFi ID。如果有
  Serial.println("Connecting ...");                            // 则尝试使用此处存储的密码进行连接。
  
  while (wifiMulti.run() != WL_CONNECTED) { // 尝试进行wifi连接。
    delay(250);
    Serial.print('.');
  }

  // WiFi连接成功后将通过串口监视器输出连接成功信息 
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());              // 通过串口监视器输出连接的WiFi名称
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());           // 通过串口监视器输出ESP8266-NodeMCU的IP

  // 进行设备登陆
  if(deviceInfo.auth==false){
    deviceAddRequest();
    delay(3000);
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
  
  client.stop();                         
}
