/*************************************************************************/
/** OverView
 * 
 * Auth: Hongtian Shan
 * Mail: charles.shht@gmail.com
 * 
 *     功 能           函数/变量命名法
 * require,初始化变量等       *
 *   web服务器               *
 *   合约接口API    与solidity函数名保持一致
 *      监听           listen__
 * 
 * 
 * · 工具接口API            *
 * · 合约接口API    set__, get__, auth, ...
 * · JS功能API            do__
 * · 界面功能API           ui__
 * · HTML ID     对应JS功能函数名的大驼峰+后缀
 * · 全局变量          EXAMPLE_VAR
 * 
 */
/*************************************************************************/



/*************************************************************************/
/** require,初始化变量等
 * 
 */
/*************************************************************************/

"use strict";
//加载所需要的模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var Web3 = require('web3');

// 创建合约
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
function getInstance(){
    var CONTRACT = "0xB1D3E48898F33B8017A66Fe983ef36DB0519F957";
    var abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"bool","name":"wait","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceApprove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"refresh","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceReply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceTest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"bool","name":"wait","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventApprove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventReply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"bool","name":"wait","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventsClass","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"index","type":"uint8"},{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventsClassApprove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"refresh","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventsClassReply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"eventsClassId","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventsClassTest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"ReduceDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypeName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypePlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetPassword","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"_addEvent","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"_reduceAddEventsClass","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addDeviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceList","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"},{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"bool","name":"read","type":"bool"},{"internalType":"bool","name":"approve","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addDeviceListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceReply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addDeviceState","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"eventClass","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEvent","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bool","name":"approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventReply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addEventState","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventTest","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"uint8","name":"_class","type":"uint8"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventsClass","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bool","name":"_approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventsClassApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addEventsClassIndexToName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addEventsClassLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addEventsClassList","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"read","type":"bool"},{"internalType":"bool","name":"approve","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"addEventsClassNameToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventsClassReply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"addEventsClassState","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventClass","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventsClassTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_password","type":"string"}],"name":"auth","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"authAddDevice","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"authAddEvent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"authAddEventsClass","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"}],"name":"authDevice","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"authEventsClass","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_str1","type":"string"},{"internalType":"string","name":"_str2","type":"string"}],"name":"compareStr","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"deviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"devices","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devicesNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsById","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"state1","type":"bool"},{"internalType":"bool","name":"state2","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsClass","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint8","name":"count","type":"uint8"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"eventsClassNameToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eventsClassNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"eventsNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAddDevListInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getAddDevListInfoByIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddDevListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getAddEventsClassInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getAddEventsClassInfoByName","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddEventsClassLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getDeviceInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getDeviceInfoByIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeviceNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"},{"internalType":"uint8","name":"eventId","type":"uint8"}],"name":"getEvent","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"}],"name":"getEventLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassCount","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getEventsClassIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getEventsClassInfoByName","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEventsClassLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"getToDoListInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToDoListLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"reduceDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint8","name":"planId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypePlan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"oldPassword","type":"string"},{"internalType":"string","name":"newPassword","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setPassword","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"toDoList","outputs":[{"internalType":"address","name":"device","type":"address"},{"internalType":"uint8","name":"eventType","type":"uint8"},{"internalType":"uint8","name":"refer","type":"uint8"},{"internalType":"bool","name":"read","type":"bool"},{"internalType":"bool","name":"approve","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toDoListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"toDoListNameToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]';
    return new web3.eth.Contract(JSON.parse(abi),CONTRACT);
}
var contract = getInstance();

/*************************************************************************/
/** 地图定位交互部分
 */
/*************************************************************************/

var express = require('express'); 
//引入express模块, 记得cnpm install express --save
var app = express();  //express对象

var Position = {'num':0};

app.get('/testInfo', function(req, res){ //版本检查接口
    res.header('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(Position));
});

app.listen(3000, function(){  //服务端口监听
  console.log('server now listening at port 3000');
});

/*
var Position = {};

var verStr = {test:Position, versionCode : 200};  //版本检查返回的数据，假数据，自行修改

app.get('/testInfo', function(req, res){ //版本检查接口
    res.header('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(verStr));
});

app.listen(3000, function(){  //服务端口监听
  console.log('server now listening at port 3000');
});*/


/*************************************************************************/
/** web服务器
 * 
 */
/*************************************************************************/

//创建服务
var httpServer = http.createServer(processRequest);
// 这是端口号
var port = 80;

//指定一个监听的接口
httpServer.listen(port, function() {
    console.log(`app is running at port:${port}`);
    console.log(`url: http://localhost:${port}`);
    cp.exec(`explorer http://localhost:${port}`, function () {
    });
});

//响应请求的函数
async function processRequest (request, response) {
    //mime类型
    var mime = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };
    
    //request里面切出标识符字符串
    var requestUrl = request.url;
    //console.log(request);
    //url模块的parse方法 接受一个字符串，返回一个url对象,切出来路径
    var pathName = url.parse(requestUrl).pathname;

    //对路径解码，防止中文乱码
    var pathName = decodeURI(pathName);

    // 解析参数
    var result = await web3Operation(decodeURI(requestUrl));
    if(result!=false){
        // 进行回传
        response.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(result["json"]);
        response.end(JSON.stringify(result["json"]));
        /*
        // 不进行html传递
        if("pass" in result){
            if(result.pass==true) return;
        }*/
    }

    //解决301重定向问题，如果pathname没以/结尾，并且没有扩展名
    if (!pathName.endsWith('/') && path.extname(pathName) === '') {
        pathName += '/';
        var redirect = "http://" + request.headers.host + pathName;
        response.writeHead(301, {
            location: redirect
        });
        //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
        response.end();
    }

    //获取资源文件的绝对路径
    /*  var filePath = path.resolve(__dirname + pathName);*/
    //__dirname是访问项目静态资源的路径 我的项目静态文件都在public下所以我写public可根据自己项目路径来配置哦
    var filePath = path.resolve("public" + pathName);
    //获取对应文件的文档类型
    //我们通过path.extname来获取文件的后缀名。由于extname返回值包含”.”，所以通过slice方法来剔除掉”.”，
    //对于没有后缀名的文件，我们一律认为是unknown。
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';

    //未知的类型一律用"text/plain"类型
    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath, (err, stats) => {
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404</h1>");
        }
        //没出错 并且文件存在
        if (!err && stats.isFile()) {
            readFile(filePath, contentType);
        }
        //如果路径是目录
        if (!err && stats.isDirectory()) {
            var html = "<head><meta charset = 'utf-8'/></head><body><ul>";
            //读取该路径下文件
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("读取路径失败！");
                } else {
                    //做成一个链接表，方便用户访问
                    var flag = false;
                    for (var file of files) {
                        //如果在目录下找到index.html，直接读取这个文件
                        if (file === "index.html") {
                            readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
                            flag = true;
                            break;
                        };
                        html += `<li><a href='${file}'>${file}</a></li>`;
                    }
                    if(!flag) {
                        html += '</ul></body>';
                        response.writeHead(200, { "content-type": "text/html" });
                        response.end(html);
                    }
                }
            });
        }
        //读取文件的函数
        function readFile(filePath, contentType){
            response.writeHead(200, { "content-type": contentType });
            //建立流对象，读文件
            var stream = fs.createReadStream(filePath);
            //错误处理
            stream.on('error', function() {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
            });
            //读取文件
            stream.pipe(response);
        }
    });
}

/*************************************************************************/
/** 合约接口API
 * 
 * 账户-------------------------------------------------------------------
 * 
 * 获取accounts[0]            getAccount0()
 * 解锁accounts[0]            unlockAccount0()
 * 添加账户                    addAccount()
 * 
 * 设备-------------------------------------------------------------------
 * 
 * 设备认证                    authDevice(_account,password)
 * 设备添加认证                 authAddDevice(_account)
 * 添加设备                    addDevice(account,password,name,detail)
 * 添加设备状态                addDeviceState(account)
 * 添加设备批准回复             addDeviceReply(account)
 * 
 * 事件类型----------------------------------------------------------------
 * 
 * 获取敏感事件序号             getEventsClassIndex(name)
 * 事件类型认证                 authEventsClass(name)
 * 添加事件类型认证             authAddEventsClass(name)
 * 添加事件类型                 addEventsClass(_account,_password,eventClass,eventName)
 * 添加事件类型批准回复          addEventTypeReply(index)
 * 
 * 事件-------------------------------------------------------------------
 * 
 * 敏感事件申请                 addEvent(_account,password,eventId)
 * 添加事件状态查询              addEventState(name)
 * 添加事件批准回复              addEventReply(name)
 */
/*************************************************************************/

// 合约接口API - 账户 -----------------------------------------------------

/**
 * 获取accounts[0]
 */
function getAccount0(){
    return new Promise(function(result){
        web3.eth.getAccounts().then(function(accounts){
            result(accounts[0]);
        }, function(reason) {
            // 为设备生成一个账户 - 失败
            console.log("Fail to get accounts list",reason);
            result(false);
        });
    });
}

/**
 * 解锁account0
 */
async function unlockAccount0(){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(false);
        }
        web3.eth.personal.unlockAccount(account,"").then(function(value){
            result(true);
        }, function(reason) {
            console.log("unlockAccount failed",reason);
            result(false);
        });
    });
}

/**
 * 添加账户
 */
function addAccount(){
    var _password = randomNum(10000000,99999999).toString();
    var _account;

    return new Promise(function(result){
        web3.eth.personal.newAccount(_password).then(function(value) {
            _account = value;
            console.log("Generate New User:",_account,_password);
            result({"account":_account,"password":_password});
        }, function(reason) {
            console.log(reason);
            result(false);
        });
    });
}

// 合约接口API - 设备 -----------------------------------------------------

/**
 * 设备认证
 */
async function authDevice(_account,password){
    return new Promise(function(result){
        try{
            contract.methods.authDevice(_account,password).call(function(error, res){
                if(error){
                    console.log("Error: Unknown User (authDevice)");
                    result(false);
                }else{
                    console.log("Device Auth: ",res);
                    result(res);
                }
            });
        }catch{
            console.log("Fail to run authDevice function!");
            result(false);
        }
    });
}

/**
 * 添加设备认证
 */
async function authAddDevice(_account){
    return new Promise(function(result){
        try{
            contract.methods.authAddDevice(_account).call(function(error, res){
                if(error){
                    console.log("Error: Unknown User (authAddDevice)",_account);
                    result(false);
                }else{
                    console.log("Add Device Auth: ",res);
                    result(res);
                }
            });
        }catch{
            console.log("Fail to run authAddDevice function!");
            result(false);
        }
    });
}

/**
 * 添加设备
 */
async function _addDevice(account,password,name,detail,identity){
    var _account = await getAccount0();
    return new Promise(function(result){
        if(_account==false){
            result(false);
            console.log("getAccount0 failed ",identity);
        }
        contract.methods.addDevice(account,password,name,detail,identity).send({from:_account})
        .then(function(res){
            console.log("Add Device Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Device failed!",reason);
            result(false);
        });
    });
}
async function addDevice(account,password,name,detail){
    var identity = randomNum(100000,999999);
    if(await _addDevice(account,password,name,detail,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddDevice',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        console.log("Add Device Send Get Reply ",identity);
                        result({"approve":res[i]["returnValues"]["approve"],"wait":res[i]["returnValues"]["wait"]});
                    }
                }
            }
        });
    });
}

/**
 * 设备是否添加列表中
 */
async function addDeviceState(account){
    return new Promise(function(result){
        contract.methods.addDeviceState(account).call(function(error, res){
            if(error){
                console.log("Adding device state Error");
                result(false);
            }else{
                console.log("Adding device state: ",res);
                result({
                    "0":res[0],"1":res[1],"2":res[2],
                    "approve":res[0],"wait":res[1],"password":res[2]
                });
            }
        });
    });
}

/**
 * 添加设备批准回复
 */
async function _addDeviceReply(account,identity) {
    var account_ = await getAccount0();
    return new Promise(function(result){
        if(account_==false){
            result(false);
        }
        contract.methods.addDeviceReply(account,identity).send({from:account_})
        .then(function(res){
            console.log("Add Device Reply Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Device Reply failed!",reason);
            result(false);
        });
    });
}
async function addDeviceReply(account){
    var identity = randomNum(100000,999999);
    if(await _addDeviceReply(account,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddDeviceReply',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        console.log("add Device Reply Success!",identity);
                        result(true);
                    }
                }
            }
        });
    });
}

// 合约接口API - 事件类型----------------------------------------------------------------

/**
 * 获取敏感事件序号
 */
async function getEventsClassIndex(name){
    return new Promise(function(result){
        contract.methods.addEventsClassState(name).call(function(error, res){
            if(error){
                console.log("Adding events class state Error");
                result(false);
            }else{
                console.log("Adding events class state: ",res);
                result(parseInt(res));
            }
        });
    });
}

/**
 * 获取敏感事件类别信息
 */
async function getEventsClassInfo(eventTypeId){
    return new Promise(function(result){
        contract.methods.getEventsClassInfo(eventTypeId).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Info: ",res);
                result({
                    '0':res[0],'1':res[1],'2':res[2],
                    'id':res[0],'class':res[1],'name':res[2]
                });
            }
        });
    });
}

/**
 * 获取敏感事件类别信息
 */
async function getEventsClassInfoByName(name){
    return new Promise(function(result){
        contract.methods.getEventsClassInfoByName(name).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Info: ",res);
                result({
                    '0':parseInt(res[0]),'1':parseInt(res[1]),'2':res[2],
                    'id':parseInt(res[0]),'class':parseInt(res[1]),'name':res[2]
                });
            }
        });
    });
}

/**
 * 事件类型认证
 */
async function authEventsClass(name){
    return new Promise(function(result){
        contract.methods.authEventsClass(name).call(function(error, res){
            if(error){
                console.log("Error: Unknown Events Class (authEventsClass) ",name);
                result(false);
            }else{
                console.log("Events Class Auth: ",res);
                result(res);
            }
        });
    });
}

/**
 * 添加事件类型认证
 */
async function authAddEventsClass(name){
    return new Promise(function(result){
        contract.methods.authAddEventsClass(name).call(function(error, res){
            if(error){
                console.log("Error: Unknown User (authEventsClass)");
                result(false);
            }else{
                console.log("Events Class Auth: ",res);
                result(res);
            }
        });
    });
}

/**
 * 添加事件类型
 */
async function _addEventsClass(_account,_password,eventClass,eventName,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventsClass(_account,_password,eventClass,eventName,identity).send({from:account}).then(function(res){
            console.log("Add EventType Request Send",identity);
            result(true);
        }, function(error) {
            console.log("Add EventType Failed!",error);
            result(false);
        });
    });
}
async function addEventsClass(_account,_password,eventClass,eventName){
    var identity = randomNum(100000,999999);
    if(await _addEventsClass(_account,_password,eventClass,eventName,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddEventsClass',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else for(var i=0;i<res.length;i++)
                if(res[i]["returnValues"]["identity"]==identity)
                    result({"approve":res[i]["returnValues"]["approve"],
                        "wait":res[i]["returnValues"]["wait"]});
        });
    });
}

/**
 * 设备是否添加列表中
 */
async function addEventsClassState(name){
    return new Promise(function(result){
        contract.methods.addEventsClassState(name).call(function(error, res){
            if(error){
                console.log("Adding events class state Error");
                result(false);
            }else{
                console.log("Adding events class state: ",res);
                result({"approve":res[0],"wait":res[1]});
            }
        });
    });
}

/**
 * 添加事件类型批准回复
 */
async function _addEventsClassReply(name,identity) {
    var account_ = await getAccount0();
    return new Promise(function(result){
        if(account_==false){
            result(false);
        }
        contract.methods.addEventsClassReply(name,identity).send({from:account_})
        .then(function(res){
            console.log("Add Event Type Reply Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Event Type Reply failed!",reason);
            result(false);
        });
    });
}
async function addEventsClassReply(name){
    var identity = randomNum(100000,999999);
    if(await _addEventsClassReply(name,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddEventsClassReply',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        console.log("Add Event Type Reply Request Got Reply ",identity);
                        result(true);
                    }
                }
            }
        });
    });
}

// 合约接口API - 事件----------------------------------------------------------------

/**
 * 添加事件认证
 */
async function authAddEvent(name){
    return new Promise(function(result){
        contract.methods.authAddEvent(name).call(function(error, res){
            if(error){
                console.log("Error: Unknown Event (authAddEvent)");
                result(false);
            }else{
                console.log("Event Auth: ",res);
                result(res);
            }
        });
    });
}

/**
 * 敏感事件申请
 */
async function _addEvent(_account,password,eventId,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEvent(_account,password,eventId,identity).send({from:account})
        .then(function(res){
            console.log("Add Event Request Send ",identity);
            result(true);
        }, function(error) {
            console.log("Add Event Failed!",error);
            result(false);
        });
    });
}
async function addEvent(_account,password,eventId){
    var identity = randomNum(100000,999999);
    if(await _addEvent(_account,password,eventId,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddEvent',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else
                for(var i=0;i<res.length;i++)
                    if(res[i]["returnValues"]["identity"]==identity)
                        result({"approve":res[i]["returnValues"]["approve"],
                            "wait":res[i]["returnValues"]["wait"]});
        });
    });
}

/**
 * 添加事件状态查询
 */
async function addEventState(name){
    return new Promise(function(result){
        contract.methods.addEventState(name).call(function(error, res){
            if(error){
                console.log("Adding events state Error");
                result(false);
            }else{
                console.log("Adding events state: ",res);
                result({"wait":res[0],"approve":res[1]});
            }
        });
    });
}

/**
 * 添加事件批准回复
 */
async function _addEventReply(name,identity) {
    var account_ = await getAccount0();
    return new Promise(function(result){
        if(account_==false){
            result(false);
        }
        contract.methods.addEventReply(name,identity).send({from:account_})
        .then(function(res){
            console.log("Add Event Reply Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Event Reply failed!",reason);
            result(false);
        });
    });
}
async function addEventReply(name){
    var identity = randomNum(100000,999999);
    if(await _addEventReply(name,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddEventReply',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        console.log("Add Event Reply Request Got Reply ",identity);
                        result(true);
                    }
                }
            }
        });
    });
}

/*************************************************************************/
/** 合约接口API
 * 
 * 中枢-------------------------------------------------------------------
 * 
 * web3命令控制中枢                   web3Operation(commandString)
 * 
 * 设备-------------------------------------------------------------------
 * 
 * 添加设备                          doAddDevice(newName,newDetail)
 * 监听添加设备通过事件                listenAddDevice()
 * 
 */
/*************************************************************************/

/**
 * web3命令控制中枢
 */
async function web3Operation(commandString_){
    var commandString = commandString_;
    if(commandString.indexOf("?") == -1 ){
        return false;
    }else{
        commandString = commandString.substring(commandString.indexOf("?")+1);
    }
    commandString=commandString.replace(/\+/g," ");
    commandString=commandString.split("&");
    var command={};
    for(var x=0;x<commandString.length; x++){
        command[commandString[x].split("=")[0]]=commandString[x].split("=")[1];
    }

    console.log('command: ',command);

    if("account" in command == false) return false;
    if("password" in command == false) return false;
    if("type" in command ==false) return false;

    if(command.type=="ping"){
        /*
        {
            'json':{
                'res': true
            }
        }
        */
        return {'json':{'res':true}};
    }else if(command.type=="auth"){
        /*
        {
            'json':{
                'res': true
            }
        }
        */
        return {'json':{'res':await authDevice(command.account,command.password)}};
    }else if(command.type=="authEventsClass"){
        /*
        {
            'json':{
                'res': true
            }
        }
        */
        return {'json':{'res':await authEventsClass(command.name)}};
    }else if(command.type=="addDevice"){
        /*
        {
            'json':{
                'valid': true/false,     // 访问失败
                'approve': true/false,   // 同意或拒绝
                'wait': true/false,      // approve==false时判断是否需要等待
                'account': 0x../0,       // 同意或需要等待时告知设备账户
                'password': 'xxx'/''     // 同意时告知设备密码
            }
        }
         */
        if("name" in command == false) return {'json':{'valid':false}};
        if("id"   in command == false) return {'json':{'valid':false}};
        if("info" in command == false) command.info="";
        if(await authAddDevice(command.account)==false){
            // 新设备添加
            if(doAddAccountAvoid(command.id)){
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true,
                    'account':command["account"],
                    'password':"------r-" // 重复的添加设备请求（造成原因：以太坊服务器处理速度慢）
                }}
            }
            var info = await addAccount(command.name,command.info);
            if(info==false) return {'json':{'valid':false}};
            var add_type = await getEventsClassInfo(1);
            if(add_type==false) return {'json':{'valid':false}};
            var res = doAddDevice(info["account"],info["password"],command.name,command.info);
            if(add_type[1]==1 || add_type[1]==2){
                // 直接通过
                doAddAccountAvoidReduce(command["id"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true,
                    'account':info["account"],
                    'password':info["password"]
                }}
            }else if(add_type[1]==4){
                // 拒绝
                doAddAccountAvoidReduce(command["id"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false,
                    'account':"0x----------------------------------------",
                    'password':"------d-" // 拒绝请求
                }}
            }else{
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true,
                    'account':info["account"],
                    'password':"------w-" // 等待中
                }}
            }
        }else{
            // 设备检查申请状态
            var state = await addDeviceState(command["account"]);
            if(state==false){
                // 失败
                addDeviceReply(command["account"]);
                doAddAccountAvoidReduce(command["id"]);
                return {'valid':false,'wait':false,'approve':false};
            }else if(state['approve']==true){
                // 同意
                addDeviceReply(command["account"]);
                doAddAccountAvoidReduce(command["id"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true,
                    'account':command["account"],
                    'password':state["password"]
                }}
            }else if(state['approve']==false && state['wait']==true){
                // 等待
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true,
                    'account':command["account"],
                    'password':"------w-"
                }}
            }else{
                // 拒绝
                addDeviceReply(command["account"]);
                doAddAccountAvoidReduce(command["id"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false,
                    'account':"0x----------------------------------------",
                    'password':"------d-" // 拒绝请求
                }}
            }
        }
    }else if(command.type=="addEventsClass"){
        /*
        {
            'json':{
                'valid': true/false,     // 访问失败
                'approve': true/false,   // 同意或拒绝
                'wait': true/false,      // approve==false时判断是否需要等待
            }
        }
         */
        if(await authDevice(command.account,command.password)==false) return {'json':{'valid':false}};
        if("name"  in command == false) return {'json':{'valid':false}};
        if("class" in command == false) return {'json':{'valid':false}};
        if(await authAddEventsClass(command.name)==false){
            // 新设备添加
            if(doAddEventsClassAvoid(command.name)){
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true
                }}
            }
            var add_type = await getEventsClassInfo(2);
            if(add_type==false) return {'json':{'valid':false}};
            var res = doAddEventsClass(command.account,command.password,command.class,command.name);
            if(add_type[1]==1 || add_type[1]==2){
                // 直接通过
                doAddEventsClassAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true,
                }}
            }else if(add_type[1]==4){
                // 拒绝
                doAddEventsClassAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false,
                }}
            }else{
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true,
                }}
            }
        }else{
            // 设备检查申请状态
            var state = await addEventsClassState(command["name"]);
            if(state==false){
                // 失败
                addEventsClassReply(command["name"]);
                doAddEventsClassAvoidReduce(command["name"]);
                return {'valid':false,'wait':false,'approve':false};
            }else if(state['approve']==true){
                // 同意
                addEventsClassReply(command["name"]);
                doAddEventsClassAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true
                }}
            }else if(state['approve']==false && state['wait']==true){
                // 等待
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true
                }}
            }else{
                // 拒绝
                addEventsClassReply(command["name"]);
                doAddEventsClassAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false
                }}
            }
        }
    }else if(command.type=="addEvent"){
        /*
        {
            'json':{
                'valid': true/false,     // 访问失败
                'approve': true/false,   // 同意或拒绝
                'wait': true/false,      // approve==false时判断是否需要等待
            }
        }
        */
        if(await authDevice(command.account,command.password)==false) return {'json':{'valid':false}};
        if("name"  in command == false) return {'json':{'valid':false}};
        if(await authEventsClass(command.name)==false) return {'json':{'valid':false}};
        if(await authAddEvent(command.name)==false){
            // 新事件添加
            if(doAddEventAvoid(command.name)){
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true
                }}
            }
            var eventsClassInfo = await getEventsClassInfoByName(command.name);
            var add_type = eventsClassInfo["class"];
            if(add_type==false) return {'json':{'valid':false}};
            var res = doAddEvent(command.account,command.password,command.name);
            if(add_type==1 || add_type==2){
                // 直接通过
                doAddEventAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true,
                }}
            }else if(add_type==4){
                // 拒绝
                doAddEventAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false,
                }}
            }else{
                // 申请
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true,
                }}
            }
        }else{
            // 设备检查申请状态
            var state = await addEventState(command["name"]);
            if(state==false){
                // 失败
                addEventReply(command["name"]);
                doAddEventAvoidReduce(command["name"]);
                return {'valid':false,'wait':false,'approve':false};
            }else if(state['approve']==true){
                // 同意
                addEventReply(command["name"]);
                doAddEventAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':true,
                    'wait':true
                }}
            }else if(state['approve']==false && state['wait']==true){
                // 等待
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':true
                }}
            }else{
                // 拒绝
                addEventReply(command["name"]);
                doAddEventAvoidReduce(command["name"]);
                return {'json':{
                    'valid':true,
                    'approve':false,
                    'wait':false
                }}
            }
        }
    }else if(command.type=="position"){
        if(await authDevice(command.account,command.password)==false) return {'json':{'valid':false}};
        /**
         * 
         * command.UTCTime
         * command.latitude
         * command.N_S
         * command.longitude
         * command.E_W
         * 
         * 
         */
        Position[command.account]={};
        Position[command.account]["UTCTime"] = command.UTCTime;
        Position[command.account]["latitude"] = command.latitude;
        Position[command.account]["N_S"] = command.N_S;
        Position[command.account]["longitude"] = command.longitude;
        Position[command.account]["E_W"] = command.E_W;
        app.get('/testInfo', function(req, res){ //版本检查接口
        res.header('Access-Control-Allow-Origin', '*');
          res.send(JSON.stringify(Position));
        });
        return {'json':{
            'valid':true
        }}
    }
    return false;
}

/**
 * 添加设备
 */
async function doAddDevice(account,password,newName,newDetail){  
    var res=await addDevice(account,password,newName,newDetail);
    if(res==false){
        console.log("Failed to send Add Device Request!");
        return false;
    }else if(res["approve"]==true){
        console.log("Saved new device name",newName);
        return {
            'account':account,
            'password':password,
            'approve':true,
            'wait':false
        }
    }else if(res["wait"]==true){
        console.log("Send Add device Request",newName);
        return {
            'account':account,
            'password':"",
            'approve':false,
            'wait':true
        }
    }else{
        console.log("Deny - Add New Device Request",newName);
        return {
            'account':"",
            'password':"",
            'approve':false,
            'wait':false
        }
    }
}

/**
 * 添加设备避免
 */
var AddAdviceList = new Array();
function doAddAccountAvoid(id){
    for(var i=0;i<AddAdviceList.length;i++){
        if(AddAdviceList[i]==id){
            return true;
        }
    }
    AddAdviceList.push(id);
    return false;
}

/**
 * 取消添加设备避免
 */
function doAddAccountAvoidReduce(id){
    var index = AddAdviceList.indexOf(id);
    delete AddAdviceList[index];
    return true;
}

/**
 * 添加事件类型
 */
async function doAddEventsClass(account,password,newClass,newName){  
    var res=await addEventsClass(account,password,newClass,newName);
    if(res==false){
        console.log("Failed to send Add Events Class Request!");
        return false;
    }else if(res["approve"]==true){
        console.log("Saved new events class ",newName);
        return {
            'approve':true,
            'wait':false
        }
    }else if(res["wait"]==true){
        console.log("Send Add events class Request ",newName);
        return {
            'approve':false,
            'wait':true
        }
    }else{
        console.log("Deny - Add New Events Class Request ",newName);
        return {
            'approve':false,
            'wait':false
        }
    }
}

/**
 * 添加事件类型避免
 */
var AddEventsClassList = new Array();
function doAddEventsClassAvoid(name){
    for(var i=0;i<AddEventsClassList.length;i++){
        if(AddEventsClassList[i]==name){
            return true;
        }
    }
    AddEventsClassList.push(name);
    return false;
}

/**
 * 取消添加事件类型避免
 */
function doAddEventsClassAvoidReduce(name){
    var index = AddEventsClassList.indexOf(name);
    delete AddEventsClassList[index];
    return true;
}

/**
 * 添加事件类型
 */
async function doAddEvent(account,password,newClass){  
    var res=await addEvent(account,password,newClass);
    if(res==false){
        console.log("Failed to send Add Event Request!");
        return false;
    }else if(res["approve"]==true){
        console.log("Saved new event ",newClass);
        return {
            'approve':true,
            'wait':false
        }
    }else if(res["wait"]==true){
        console.log("Send Add event Request ",newClass);
        return {
            'approve':false,
            'wait':true
        }
    }else{
        console.log("Deny - Add New Event Request ",newClass);
        return {
            'approve':false,
            'wait':false
        }
    }
}

/**
 * 添加事件避免
 */
var AddEventList = new Array();
function doAddEventAvoid(name){
    for(var i=0;i<AddEventList.length;i++){
        if(AddEventList[i]==name){
            return true;
        }
    }
    AddEventList.push(name);
    return false;
}

/**
 * 取消添加事件避免
 */
function doAddEventAvoidReduce(name){
    var index = AddEventList.indexOf(name);
    delete AddEventList[index];
    return true;
}

/*************************************************************************/
/** 工具接口API
 * 生成随机数      randomNum(minNum,maxNum)
 */
/*************************************************************************/

/**
 * 生成随机数
 */
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}


