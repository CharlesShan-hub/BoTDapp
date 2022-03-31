/**
 * BoT物联网接口
 * 
 * * 连接Wi-Fi
 * 
 * BoT_addAP       添加AP
 * BoT_connectWiFi 连接Wi-Fi
 * 
 * * BoT - 功能API
 * 
 * BoT_doPing          确认可以连接BoT服务器
 * 
 * * BoT - 通信API
 * 
 * BoT_ping            尝试连接BoT服务器
 * 
 * 
 */

#include <ESP8266WiFiMulti.h>   // 使用WiFiMulti库
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <EEPROM.h> 

int BoT_current_id = random(300);

//a写入字符串长度，b是起始位，str为要保存的字符串
void BoT_set_String(int b,String str){
  //EEPROM.write(a, str.length());//EEPROM第a位，写入str字符串的长度
  //把str所有数据逐个保存在EEPROM
  for (int i = 0; i < str.length(); i++){
    EEPROM.write(b + i, str[i]);
  }
  EEPROM.commit();
}

//a位是字符串长度，b是起始位
String BoT_get_String(int b,int a){ 
  String data = "";
  //从EEPROM中逐个取出每一位的值，并链接
  for (int i = 0; i < a; i++){
    data += char(EEPROM.read(b + i));
  }
  return data;
}

/******************************************************
 * 
 * 工具
 * 
 ******************************************************/
void BoT_tool_httpRequest(String &str,String url){
  str =  String("GET ") + url + " HTTP/1.1\r\n" +
                        "Host: " + BoT_host + "\r\n" +
                        "Connection: close\r\n" +
                        "\r\n";
}

bool BoT_sleep(){
  while(1){
    Serial.println("Sleep...");
    delay(10000);
  }
}

bool BoT_get(WiFiClient &client,StaticJsonDocument<256> &doc){
  // 获取并显示服务器响应状态行 
  String json;
  String status_response = client.readStringUntil('\n');
  Serial.print("status_response: ");
  Serial.println(status_response);

  int count = 0;
  while (client.connected() || client.available()){ 
    if (client.available()){
      json = client.readStringUntil('\n');
      count++;
      if(count==7)break;
    }
  }
  if(json[json.length()-1]=='\r')
    json = json.substring(0,json.length()-1);

  DeserializationError err = deserializeJson(doc,json);
  if(err){
    Serial.print("ERROR: ");
    Serial.println(err.c_str());
    Serial.println(json);
    return false;
  }
  return true;
}

bool BoT_send(WiFiClient &client,String &httpRequest){
  if (client.connect(BoT_host, BoT_httpPort)){
    client.print(httpRequest);
    Serial.println("Sending request: ");
    Serial.println(httpRequest.substring(0,httpRequest.length()-4)); 
    return true;
  }else{
    Serial.println(" connection failed!\n");
    client.stop();
    return false;
  }
}

bool BoT_stop(WiFiClient &client){
    client.stop();                      // 断开与服务器的连接
    Serial.print("Disconnected from "); // 并且通过串口输出断开连接信息
    Serial.print(BoT_host);
    Serial.println("\n");
    return true;
}

/******************************************************
 * 
 * 连接Wi-Fi
 * 
 ******************************************************/

bool BoT_connectWiFi(){
  ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是 'wifiMulti'

  StaticJsonDocument<256> doc;
  DeserializationError err = deserializeJson(doc,BoT_AP);
  if(err){
    Serial.print("ERROR: ");
    Serial.println(err.c_str());
    return false;
  }
  for(int i=0;i<BoT_AP_number;i++){
    wifiMulti.addAP(doc["name"][i], doc["password"][i]);
  }
  
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
  Serial.println();

  return true;
}

/******************************************************
 * 
 * 通信API
 * 
 ******************************************************/

bool BoT_ping(){
  // 构造请求报文
  String httpRequest;
  String url = "/update"\
               "?type=ping"\
               "&account="
               "&password=";
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  BoT_stop(client);
  return doc["res"].as<String>().equals("true");
}

bool BoT_auth(){
  String account = BoT_get_String(0,42);
  String password = BoT_get_String(42,8);

  // 构造请求报文
  String httpRequest;
  String url = "/update"\
               "?type=auth"\
               "&account="+account+
               "&password="+password;
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  BoT_stop(client);
  return doc["res"].as<String>().equals("true");
}

bool BoT_eventsClassAuth(String name){
  String account = BoT_get_String(0,42);
  String password = BoT_get_String(42,8);

  // 构造请求报文
  String httpRequest;
  String url = "/update"\
               "?type=authEventsClass"\
               "&account="+account+
               "&password="+password+\
               "&name="+name;
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  BoT_stop(client);
  return doc["res"].as<String>().equals("true");
}

String BoT_get_account(){
  return BoT_get_String(0,42);
}

String BoT_get_password(){
  return BoT_get_String(42,8);
}

bool BoT_addDeviceRequest(){
  // 构造请求报文
  String httpRequest;
  String url = "/update?"\
               "account="+BoT_get_account()+\
               "&password="\
               "&type=addDevice"\
               "&info="+BoT_info+\
               "&name="+BoT_name+\
               "&id="+String(BoT_current_id);
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  // 信息主体
  if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == false){
    // 拒绝添加新设备
    BoT_stop(client);
    BoT_sleep();
    return false;
  }else if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == true){
    // 等待用户通过
    Serial.println("Waiting User to Approve...");
    BoT_set_String(0,doc["account"].as<String>());
    BoT_set_String(42,doc["password"].as<String>());
    BoT_stop(client);
    return false;
  }else if(doc["approve"].as<bool>() == true){
    // 保存设备信息
    Serial.println("User approved add device!");
    BoT_set_String(0,doc["account"].as<String>());
    BoT_set_String(42,doc["password"].as<String>());
    BoT_stop(client);
    return true;
  }else{
    Serial.println("Unknow condition!");
    BoT_stop(client);
    return false;
  }
}

bool BoT_addEventsClassRequest(String name,int _class){
  
  // 构造请求报文
  String httpRequest;
  String url = "/update?"\
               "account="+BoT_get_account()+\
               "&password="+BoT_get_password()+\
               "&type=addEventsClass"\
               "&class="+String(_class)+\
               "&name="+name;
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  // 信息主体
  if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == false){
    // 拒绝添加新设备
    BoT_stop(client);
    BoT_sleep();
    return false;
  }else if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == true){
    // 等待用户通过
    Serial.println("Waiting User to Approve...");
    BoT_stop(client);
    return false;
  }else if(doc["approve"].as<bool>() == true){
    // 保存设备信息
    Serial.println("User approved add events class!");
    BoT_stop(client);
    return true;
  }else{
    Serial.println("Unknow condition!");
    BoT_stop(client);
    return false;
  }
}

bool BoT_addEventRequest(String name,int _class){
  
  // 构造请求报文
  String httpRequest;
  String url = "/update?"\
               "account="+BoT_get_account()+\
               "&password="+BoT_get_password()+\
               "&type=addEvent"\
               "&class="+String(_class)+\
               "&name="+name;
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }

  // 信息主体
  if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == false){
    // 拒绝添加新设备
    BoT_stop(client);
    BoT_sleep();
    return false;
  }else if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == true){
    // 等待用户通过
    Serial.println("Waiting User to Approve...");
    BoT_stop(client);
    return false;
  }else if(doc["approve"].as<bool>() == true){
    // 保存设备信息
    Serial.println("User approved add event!");
    BoT_stop(client);
    return true;
  }else{
    Serial.println("Unknow condition!");
    BoT_stop(client);
    return false;
  }
}

/******************************************************
 * 
 * 功能API
 * 
 * * 数据结构
 * - 设备信息
 * 
 * * API
 * - BoT_doPing()      确认可以连接服务器
 * - BoT_doAuth()      确认设备连入服务器
 * - BoT_sleep()       设备永久停止(直到重置设备)
 * 
 ******************************************************/

bool BoT_doPing(){
  Serial.println("Ping BoT Server...");
  while(1){
    if(BoT_ping()==false)
      delay(10000);
    else
      break;
  }
  return true;
}

bool BoT_doAuth(){
  Serial.println("Doing Device Auth...");
  
  if(BoT_auth()==false){
    while(BoT_addDeviceRequest()==false){
      delay(6000);
    }
    delay(8000);
  }
  return true;
}

bool BoT_doAuthEventType(String name,int _class){
  Serial.println("Doing Events Class Auth...");

  if(BoT_eventsClassAuth(name)==false){
    while(BoT_addEventsClassRequest(name,_class)==false){
        delay(6000);
    }
    delay(8000);
  }
  return true;
}

bool BoT_request(String name,int _class){
  Serial.println("Doing Events Class Auth...");
  BoT_doAuthEventType(name,_class);
  while(BoT_addEventRequest(name,_class)==false){
      delay(6000);
  }
  return true;
}

bool BoT_init(){
  // 启动串口通讯
  Serial.begin(9600);
  while (!Serial) continue;
  EEPROM.begin(256);
  
  // 连接Wi-Fi
  BoT_connectWiFi();
  
  // 进行设备登陆
  BoT_doAuth();
}