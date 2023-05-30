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

#define GpsSerial  Serial
#define DebugSerial Serial

struct{
  char GPS_Buffer[80];
  bool isGetData;   //是否获取到GPS数据
  bool isParseData; //是否解析完成
  char UTCTime[11];   //UTC时间
  char latitude[11];    //纬度
  char N_S[2];    //N/S
  char longitude[12];   //经度
  char E_W[2];    //E/W
  bool isUsefull;   //定位信息是否有效
} Save_Data;

const unsigned int gpsRxBufferLength = 600;
char gpsRxBuffer[gpsRxBufferLength];
unsigned int ii = 0;

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

String BoT_get_account(){
  return BoT_get_String(0,42);
}

String BoT_get_password(){
  return BoT_get_String(42,8);
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

void errorLog(int num){
  DebugSerial.print("ERROR");
  DebugSerial.println(num);
  BoT_sleep();
}

void printGpsBuffer(){
  if (Save_Data.isParseData)
  {
    Save_Data.isParseData = false;
    
    DebugSerial.print("Save_Data.UTCTime = ");
    DebugSerial.println(Save_Data.UTCTime);

    if(Save_Data.isUsefull)
    {
      Save_Data.isUsefull = false;
      DebugSerial.print("Save_Data.latitude = ");
      DebugSerial.println(Save_Data.latitude);
      DebugSerial.print("Save_Data.N_S = ");
      DebugSerial.println(Save_Data.N_S);
      DebugSerial.print("Save_Data.longitude = ");
      DebugSerial.println(Save_Data.longitude);
      DebugSerial.print("Save_Data.E_W = ");
      DebugSerial.println(Save_Data.E_W);
    }
    else
    {
      DebugSerial.println("GPS DATA is not usefull!");
    }
    
  }
}

void clrGpsRxBuffer(void){
  memset(gpsRxBuffer, 0, gpsRxBufferLength);      //清空
  ii = 0;
}

void parseGpsBuffer(){
  char *subString;
  char *subStringNext;
  if (Save_Data.isGetData)
  {
    Save_Data.isGetData = false;
    DebugSerial.println("**************");
    DebugSerial.println(Save_Data.GPS_Buffer);

    
    for (int i = 0 ; i <= 6 ; i++)
    {
      if (i == 0)
      {
        if ((subString = strstr(Save_Data.GPS_Buffer, ",")) == NULL)
          errorLog(1);  //解析错误
      }
      else
      {
        subString++;
        if ((subStringNext = strstr(subString, ",")) != NULL)
        {
          char usefullBuffer[2]; 
          switch(i)
          {
            case 1:memcpy(Save_Data.UTCTime, subString, subStringNext - subString);break; //获取UTC时间
            case 2:memcpy(usefullBuffer, subString, subStringNext - subString);break; //获取UTC时间
            case 3:memcpy(Save_Data.latitude, subString, subStringNext - subString);break;  //获取纬度信息
            case 4:memcpy(Save_Data.N_S, subString, subStringNext - subString);break; //获取N/S
            case 5:memcpy(Save_Data.longitude, subString, subStringNext - subString);break; //获取纬度信息
            case 6:memcpy(Save_Data.E_W, subString, subStringNext - subString);break; //获取E/W

            default:break;
          }

          subString = subStringNext;
          Save_Data.isParseData = true;
          if(usefullBuffer[0] == 'A')
            Save_Data.isUsefull = true;
          else if(usefullBuffer[0] == 'V')
            Save_Data.isUsefull = false;

        }
        else
        {
          errorLog(2);  //解析错误
        }
      }


    }
  }
}

void gpsRead() {
  while (GpsSerial.available())
  {
    gpsRxBuffer[ii++] = GpsSerial.read();
    if (ii == gpsRxBufferLength)clrGpsRxBuffer();
  }

  char* GPS_BufferHead;
  char* GPS_BufferTail;
  if ((GPS_BufferHead = strstr(gpsRxBuffer, "$GPRMC,")) != NULL || (GPS_BufferHead = strstr(gpsRxBuffer, "$GNRMC,")) != NULL )
  {
    if (((GPS_BufferTail = strstr(GPS_BufferHead, "\r\n")) != NULL) && (GPS_BufferTail > GPS_BufferHead))
    {
      memcpy(Save_Data.GPS_Buffer, GPS_BufferHead, GPS_BufferTail - GPS_BufferHead);
      Save_Data.isGetData = true;

      clrGpsRxBuffer();

    }
  }
}

/******************************************************
 * 
 * 通信API
 * 
 ******************************************************/

bool BoT_connectWiFi(){
  /*
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
  
  
  */
  const char* ssid ="cPhone";
  const char* password ="11111111";
  Serial.println("Connecting ...");    // 则尝试使用此处存储的密码进行连接。
  WiFi.mode(WIFI_STA); // SETS TO STATION MODE!
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1500);
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
  // 构造请求报文
  String httpRequest;
  String url = "/update"\
               "?type=auth"\
               "&account="+BoT_get_account()+
               "&password="+BoT_get_password();
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
  // 构造请求报文
  String httpRequest;
  String url = "/update"\
               "?type=authEventsClass"\
               "&account="+BoT_get_account()+
               "&password="+BoT_get_password()+\
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

int BoT_addEventRequest(String name,int _class){
  /**
   * return -1: 错误或拒绝
   * return 0:  需要保持探寻
   * return 1:  同意
   */

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
    return -1;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return -1;
  }

  // 信息主体
  if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == false){
    // 拒绝添加新设备
    BoT_stop(client);
    return -1;
  }else if(doc["approve"].as<bool>() == false && doc["wait"].as<bool>() == true){
    // 等待用户通过
    Serial.println("Waiting User to Approve...");
    BoT_stop(client);
    return 0;
  }else if(doc["approve"].as<bool>() == true){
    // 保存设备信息
    Serial.println("User approved add event!");
    BoT_stop(client);
    return 1;
  }else{
    Serial.println("Unknow condition!");
    BoT_stop(client);
    return -1;
  }
}

/******************************************************
 * 
 * 功能API
 * 
 * BoT_init()        进行设备初始化(包含doAuth)
 * BoT_doPing()      确认可以连接服务器
 * BoT_doAuth()      确认设备连入服务器
 * BoT_sleep()       设备永久停止(直到重置设备)
 * BoT_request       进行事件申请
 * BoT_request_set   为循环结构优化的事件申请(触发部分)
 * BoT_request_clear 为循环结构优化的事件申请(复位部分)
 * BoT_position      发送定位
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
    while(BoT_auth()==false){
      delay(6000);
    }
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
    while(BoT_eventsClassAuth(name)==false){
      delay(6000);
    }
  }
  return true;
}

bool BoT_request(String name,int _class){
  Serial.println("Doing Events Class Auth...");
  BoT_doAuthEventType(name,_class);
  while(true){
    int i = BoT_addEventRequest(name,_class);
    if(i==0){
      delay(6000); // continue to check request state
    }else if(i==-1){
      return false;// deny
    }else{
      return true; // approve
    }
  }
}

typedef struct{
  String name;
  bool state;
}request;
int Requests_Num = 0;
request Requests[MAXSIZE];

bool BoT_request_set(String name,int _class){
  bool flag = true;
  for(int i=0;i<Requests_Num;i++){
    // 选择本次事件类型
    if(name.equals(Requests[i].name)==false) continue;
    flag = false;
    // true代表已经打开标识
    if(Requests[i].state) return true;
    // false代表本次需要申请
    Requests[i].state=true;
    return BoT_request(name,_class);
  }
  if(flag){
    if(MAXSIZE==Requests_Num){
      return false;
    }
    Requests[Requests_Num].name = name;
    Requests[Requests_Num].state= true;
    Requests_Num++;
    return BoT_request(name,_class);
  }
}

bool BoT_request_clear(String name){
  for(int i=0;i<Requests_Num;i++){
    if(name.equals(Requests[i].name)){
      Requests[i].state = false; // false代表已经关闭标识
    }
  }
  return true;
}

bool BoT_position(){
  /**
   * return true: 发送成功
   * return false:  各种失败
   */
  Serial.println("Doing Send Position...");
  gpsRead();  //获取GPS数据
  parseGpsBuffer();//解析GPS数据
  //printGpsBuffer();
  // 获取位置
  if (Save_Data.isParseData==false) return false;
  Save_Data.isParseData = false;
  if(Save_Data.isUsefull==false) return false;
  Save_Data.isUsefull = false;
  
  // 构造请求报文
  String httpRequest;
  String url = "/update?"\
               "account="+BoT_get_account()+\
               "&password="+BoT_get_password()+\
               "&type=position"\
               "&UTCTime="+String(Save_Data.UTCTime)+\
               "&latitude="+String(Save_Data.latitude)+\
               "&N_S="+String(Save_Data.N_S)+\
               "&longitude="+String(Save_Data.longitude)+\
               "&E_W="+String(Save_Data.E_W);
  BoT_tool_httpRequest(httpRequest,url);

  // 向服务器发送http请求信息
  WiFiClient client;  
  if(BoT_send(client,httpRequest)==false){
    return false;
  }else{
    return true;
  }

  // 获取返回信息
  StaticJsonDocument<256> doc;
  if(BoT_get(client,doc)==false){
    return false;
  }
}

bool BoT_init(){
  // 启动串口通讯
  Serial.begin(9600);
  while (!Serial) continue;
  GpsSerial.begin(9600);
  DebugSerial.begin(9600);
  EEPROM.begin(256);

  Save_Data.isGetData = false;
  Save_Data.isParseData = false;
  Save_Data.isUsefull = false;
  
  // 连接Wi-Fi
  BoT_connectWiFi();

  // 进行设备登陆
  BoT_doAuth();
  return true;
}
