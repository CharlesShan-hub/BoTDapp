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
    var CONTRACT = "0x9456E6A8DF8677d31133b2CCF14c49D1Eb52CE15";
    var abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"result","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceApprove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceReply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceTest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"eventsClassId","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventType","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"ReduceDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"res","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypeName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypePlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetPassword","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"ToDoListDo","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addDeviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceList","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"},{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"bool","name":"read","type":"bool"},{"internalType":"bool","name":"approve","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addDeviceListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceReply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventClass","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_password","type":"string"}],"name":"auth","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"}],"name":"authDevice","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_str1","type":"string"},{"internalType":"string","name":"_str2","type":"string"}],"name":"compareStr","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"deviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"devices","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devicesNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsById","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"state1","type":"bool"},{"internalType":"bool","name":"state2","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsClass","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint8","name":"count","type":"uint8"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eventsClassNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getAddDevListInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAddDevListInfoByIndex","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddDevListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getDeviceInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getDeviceInfoByIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeviceNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"},{"internalType":"uint8","name":"eventId","type":"uint8"}],"name":"getEvent","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"}],"name":"getEventLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassCount","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEventsClassLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"getToDoListInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToDoListLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"reduceDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEvent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint8","name":"planId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypePlan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"oldPassword","type":"string"},{"internalType":"string","name":"newPassword","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setPassword","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"toDoList","outputs":[{"internalType":"uint8","name":"device","type":"uint8"},{"internalType":"uint8","name":"eventType","type":"uint8"},{"internalType":"uint8","name":"refer","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bool","name":"approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"toDoListDo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toDoListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]';
    return new web3.eth.Contract(JSON.parse(abi),CONTRACT);
}
var contract = getInstance();

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
        response.writeHead(301, {
            location: redirect
        });
        // 不进行html传递
        if("pass" in result){
            if(result.pass==true) return;
        }
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
 * 添加设备                    addDevice(account,password,name,detail)
 * 添加设备批准回复             addDeviceReply(account)
 */
/*************************************************************************/

// 合约接口API - 账户 -----------------------------------------------------

/**
 * 获取accounts[0]
 */
function getAccount0(){
    return new Promise(function(result){
        web3.eth.getAccounts().then(function(accounts){
            console.log(accounts[0]);
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
 * 添加设备(原API)
 */
async function _addDevice(account,password,name,detail,identity){
    var _account = await getAccount0();
    return new Promise(function(result){
        if(_account==false){
            result(false);
        }
        contract.methods.addDevice(account,password,name,detail,identity).send({from:_account})
        .then(function(res){
            console.log("Add Device Request Send ",identity);
        }, function(reason) {
            console.log("Add Device failed!",reason);
            result(false);
        });
    });
}

/**
 * 添加设备
 */
async function addDevice(account,password,name,detail){
    var identity = randomNum(100000,999999);
    return new Promise(function(result){
        contract.events.AddDevice({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                if(res["returnValues"]["identity"] == identity){
                    this.unsubscribe();
                    result(res["returnValues"][0]);
                }
            }
        });
        _addDevice(account,password,name,detail,identity);
    });
}

/**
 * 添加设备批准回复(原API)
 */
async function _addDeviceReply(account,identity) {
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(false);
        }
        contract.methods.addDeviceReply(account,identity).send({from:account})
        .then(function(res){
            console.log("Add Device Reply Request Send ",identity);
        }, function(reason) {
            console.log("Add Device Reply failed!",reason);
            result(false);
        });
    });
}

/**
 * 添加设备批准回复(原API)
 */
async function addDeviceReply(account){
    var identity = randomNum(100000,999999);
    return new Promise(function(result){
        contract.events.AddDeviceReply({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                if(res["returnValues"]["identity"] == identity){
                    this.unsubscribe();
                    result(res["returnValues"][0]);
                }
            }
        });
        _addDeviceReply(account,identity);
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
async function web3Operation(commandString){
    if(commandString.indexOf("?") == -1 ){
        return false;
    }else{
        commandString = commandString.substring(commandString.indexOf("?")+1);
    }
    commandString=commandString.split("&");
    var command={};
    for(var x=0;x<commandString.length; x++){
        command[commandString[x].split("=")[0]]=commandString[x].split("=")[1];
    }
    console.log(command);

    if("id" in command == false) return false;
    if("password" in command == false) return false;
    if("index" in command ==false)return false;
    if("type" in command ==false) return false;

    if(command.type=="addDevice"){
        if("name" in command == false) return {pass:true};
        if("info" in command == false) command.info="";
        doAddDevice(command.name,command.info);
    }

    return 0;
}

/**
 * 添加设备
 */
async function doAddDevice(newName,newDetail){    
    var info = await addAccount(newName,newDetail);

    if(info!=false){
        var res=await addDevice(info["account"],info["password"],newName,newDetail);
        if(res!=0){
            console.log("Saved new device name",newName);
        }
    }
}

/**
 * 监听添加设备通过事件
 */
async function listenAddDevice(argument) {
    return new Promise(function(result){
        contract.events.AddDeviceApprove({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                if(res["returnValues"]["approve"] == true && res["returnValues"]["result"] == true){
                    //this.unsubscribe();
                    console.log("Get Add Devices Event from user");
                    console.log(res["returnValues"]["account"]);

                    // 向设备发送通过/拒绝信息
                    console.log('......滴滴滴');

                    // 向以太坊发送删除添加设备列表通知
                    var replyResult = addDeviceReply(res["returnValues"]["account"]);

                    result(replyResult);
                }
            }
        });
    });
}
listenAddDevice();


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
