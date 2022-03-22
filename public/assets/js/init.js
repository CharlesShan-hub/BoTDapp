/*************************************************************************/
/** Web3与合约
 */
/*************************************************************************/

// Node.js
//const Web3=require("web3");

// Web - HTTP
//geth --datadir ./mychain/ --networkid 15 --dev --dev.period 0 --password password.txt --http --http.api personal,eth,net,web3 --http.corsdomain '*' console --allow-insecure-unlock 2>output.log
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Web - WS
//geth --datadir ./mychain/ --networkid 15 --dev --dev.period 0 --password password.txt --ws --ws.api personal,eth,net,web3 --ws.origins '*' console --allow-insecure-unlock 2>output.log
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// Recently
//geth --datadir ./mychain/ --networkid 15 --dev --dev.period 0 --password password.txt --http --http.api personal,eth,net,web3 --http.corsdomain '*'  --ws --ws.api personal,eth,net,web3 --ws.origins '*' console --allow-insecure-unlock 2>output.log

// 创建合约
function getInstance(){
    var CONTRACT = "0x9456E6A8DF8677d31133b2CCF14c49D1Eb52CE15";
    var abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"result","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"approve","type":"bool"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceApprove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceReply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddDeviceTest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"eventsClassId","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"AddEventType","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"ReduceDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetDeviceName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"res","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypeName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetEventTypePlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"SetPassword","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"identity","type":"uint256"}],"name":"ToDoListDo","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addDeviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"addDeviceList","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"},{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"bool","name":"read","type":"bool"},{"internalType":"bool","name":"approve","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addDeviceListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceReply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addDeviceTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventClass","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"addEventType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_password","type":"string"}],"name":"auth","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"}],"name":"authDevice","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_str1","type":"string"},{"internalType":"string","name":"_str2","type":"string"}],"name":"compareStr","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deviceAccountToIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"deviceIndexToAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"devices","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"password","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"detail","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devicesNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsById","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"state1","type":"bool"},{"internalType":"bool","name":"state2","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsClass","outputs":[{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint8","name":"count","type":"uint8"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eventsClassNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"eventsNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getAddDevListInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAddDevListInfoByIndex","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddDevListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getDeviceInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getDeviceInfoByIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeviceNum","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"},{"internalType":"uint8","name":"eventId","type":"uint8"}],"name":"getEvent","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deviceId","type":"uint8"}],"name":"getEventLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassCount","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"getEventsClassInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEventsClassLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"getToDoListInfo","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToDoListLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"reduceDevice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_detail","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setDeviceName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"string","name":"_password","type":"string"},{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEvent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"eventId","type":"uint8"},{"internalType":"uint8","name":"planId","type":"uint8"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setEventTypePlan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"oldPassword","type":"string"},{"internalType":"string","name":"newPassword","type":"string"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"setPassword","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"toDoList","outputs":[{"internalType":"uint8","name":"device","type":"uint8"},{"internalType":"uint8","name":"eventType","type":"uint8"},{"internalType":"uint8","name":"refer","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bool","name":"approve","type":"bool"},{"internalType":"uint256","name":"identity","type":"uint256"}],"name":"toDoListDo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toDoListLen","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]';
    return new web3.eth.Contract(JSON.parse(abi),CONTRACT);
}
var contract = getInstance();

/*************************************************************************/
/** 合约接口API
 * 
 * 账户-------------------------------------------------------------------
 * 
 * 获取accounts[0]            getAccount0()
 * 解锁accounts[0]            unlockAccount0()
 * 添加账户                    addAccount()
 * 转账                       transfer(_from,_password,_to,_value)
 * 控制面板身份验证             auth(password)
 * 控制面板重设密码             setPassword(oldPassword,newPassword)
 * 
 * 设备-------------------------------------------------------------------
 * 
 * 设备数量                    getDeviceNum()
 * 设置设备名称                 setDeviceName(account,name)
 * 设置设备信息                 setDeviceInfo(account,name,detail)
 * 获取设备信息                 getDeviceInfo(index)
 * 添加测试设备                 addDeviceTest(account,password,name,detail)
 * 添加设备批准                 addDeviceApprove(account,approve)
 * 获取设备申请表长              getAddDevListLen()
 * 获取设备申请信息              getAddDevListInfo()
 * 删除设备                    reduceDevice(deviceId)
 * 设备认证                    authDevice(account,password,deviceId)
 * 
 * 敏感事件类别 ------------------------------------------------------------
 * 
 * 获取敏感事件类别数量          getEventsClassLength()
 * 获取敏感事件类别信息          getEventsClassInfo()
 * 修改敏感事件应对方案          setEventTypePlan(eventId,newClass)
 * 修改敏感事件名称             setEventTypeName(eventId,newName)
 * 添加事件类型                 addEventType(eventClass,eventName)
 * 获取敏感事件类别计数          getEventsClassCount(eventId)
 * 
 * 待办清单 ---------------------------------------------------------------
 * 
 * 获取代办清单长度              getToDoListLength()
 * 获取代办清单信息              getToDoListInfo(id)
 * 代办清单事件同意/拒绝          toDoListDo(index,approve)
 * 
 * 敏感事件 ---------------------------------------------------------------
 * 
 * 获取敏感事件长度              getEventLength(deviceId)
 * 获取事件信息                 getEvent(deviceId,index)
 * 清单信息同意/拒绝             setEvent(account,password,deviceId,eventId)
 * 事件Id合法认证               authEvent(id)
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
            console.log("Fail to get accounts list ",reason);
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

/**
 *  转账
 */
function transfer(_from,_password,_to,_value){
    web3.eth.personal.unlockAccount(_from,_password).then(function(value){
        // 解锁账户 - 成功
        console.log("unlockAccount",_from);
        // 转钱
        web3.eth.sendTransaction({
            from: _from,
            to: _to,
            value: web3.utils.toWei(_value.toString(), 'ether')
        }).then(function(value){
            // 为设备生成一个账户 - 成功
            console.log("transfer",_from,"to",_to,_value);
            return true;
        }, function(reason) {
            // 为设备生成一个账户 - 失败
            console.log("transfer failed",reason);
            return false;
        })
    }, function(reason) {
        // 解锁账户 - 失败
        console.log("unlockAccount failed",reason);
        return false;
    });
}

/**
 * 控制面板身份验证
 */
async function auth(password){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(false);
        }
        contract.methods.auth(password).call({from:account})
        .then(function(res){
            console.log("Send Login Request",res);
            result(res);
        }, function(reason) {
            console.log("Auth collapsed",reason);
            result(false);
        });
    });
}

/**
 * 控制面板修改密码(原API)
 */
async function _setPassword(oldPassword,newPassword,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setPassword(oldPassword,newPassword,identity).send({from:account})
        .then(function(res){
            console.log("Password Reset Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("set password failed!",reason);
            result(false);
        });
    });
}

/**
 * 控制面板修改密码
 */
async function setPassword(oldPassword,newPassword,identity){
    var identity = randomNum(100000,999999);
    if(await _setPassword(oldPassword,newPassword,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('SetPassword',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}


// 合约接口API - 设备 -----------------------------------------------------

/**
 * 获取设备数量
 */
function getDeviceNum(){
    return new Promise(function(result){
        contract.methods.getDeviceNum().call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Device Number: ",number);
                result(parseInt(number));
            }
        });
    });
}

/**
 * 设置设备名称(原API)
 */
async function _setDeviceName(_account,name,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setDeviceName(_account,name,identity).send({from:account})
        .then(function(res){
            console.log("Reset Device Name Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Reset Device Name failed!",reason);
            result(false);
        });
    });
}

/**
 * 设置设备名称
 */
async function setDeviceName(_account,name){
    var identity = randomNum(100000,999999);
    if(await _setDeviceName(_account,name,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('SetDeviceName',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 设置设备信息(原API)
 */
async function _setDeviceInfo(_account,name,detail,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setDeviceInfo(_account,name,detail,identity).send({from:account})
        .then(function(res){
            console.log("Reset Device Info Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Reset Device Info failed!",reason);
            result(false);
        });
    });
}

/**
 * 设置设备信息
 */
async function setDeviceInfo(_account,name,detail){
    var identity = randomNum(100000,999999);
    if(await _setDeviceInfo(_account,name,detail,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('SetDeviceInfo',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 获取设备信息
 */
function getDeviceInfo(account){
    return new Promise(function(result){
        contract.methods.getDeviceInfo(account).call(function(error, res){
            if(error){
                console.log("Get Device Info Error: ",error);
                result(false);
            }else{
                console.log("Get Device Info: ",res);
                result(res);
            }
        });
    });
}
function getDeviceInfoByIndex(index){
    return new Promise(function(result){
        contract.methods.getDeviceInfoByIndex(index).call(function(error, res){
            if(error){
                console.log("Get Device Info Error: ",error);
                result(false);
            }else{
                console.log("Get Device Info: ",res);
                result(res);
            }
        });
    });
}

/**
 * 添加测试设备(原API)
 */
async function _addDeviceTest(_account,password,name,detail,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(false);
        }
        contract.methods.addDeviceTest(_account,password,name,detail,identity).send({from:account})
        .then(function(res){
            console.log("Add Device Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Device failed!",reason);
            result(false);
        });
    });
}

/**
 * 添加测试设备
 */
async function addDeviceTest(_account,password,name,detail){
    var identity = randomNum(100000,999999);
    if(await _addDeviceTest(_account,password,name,detail,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddDeviceTest',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 添加设备批准(原API)
 */
async function _addDeviceApprove(_account,approve,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addDeviceApprove(_account,approve,identity).send({from:account})
        .then(function(res){
            console.log("Add Device Approve Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Device Approve failed!",reason);
            result(false);
        });
    });
}

/**
 * 添加设备批准
 */
async function addDeviceApprove(account,approve){
    var identity = randomNum(100000,999999);
    if(await _addDeviceApprove(account,approve,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddDeviceApprove',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 获取设备申请表长
 */
function getAddDevListLen(){
    return new Promise(function(result){
        contract.methods.getAddDevListLen().call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Add Device Request Number: ",number);
                result(parseInt(number));
            }
        });
    });
}

/**
 * 获取设备申请信息
 */
function getAddDevListInfo(requestId){
    return new Promise(function(result){
        contract.methods.getAddDevListInfo(requestId).call(function(error, res){
            if(error){
                console.log("Get Device Add Request Info Error: ",error);
                result(false);
            }else{
                console.log("Get Device Add Request Info: ",res);
                result(res);
            }
        });
    });
}

/**
 * 删除设备(原API)
 */
async function _reduceDevice(_account,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.reduceDevice(_account,identity).send({from:account})
        .then(function(result){
            console.log("Deleted Device Request Send",result);
            result(true);
        }, function(error) {
            console.log("Reduce Device Failed!",error);
            result(false);
        });
    });
}

/**
 * 删除设备
 */
async function reduceDevice(_account){
    var identity = randomNum(100000,999999);
    if(await _reduceDevice(_account,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('ReduceDevice',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 设备认证
 */
async function authDevice(_account,password,deviceId){
    return new Promise(function(result){
        contract.methods.authDevice(_account,password,deviceId).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Device Auth: ",res);
                result(res);
            }
        });
    });
}

// 合约接口API - 敏感事件类别 ---------------------------------------------------

/**
 * 获取敏感事件类别数量
 */
function getEventsClassLength(){
    return new Promise(function(result){
        contract.methods.getEventsClassLength().call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Number: ",number);
                result(number);
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
                result(res);
            }
        });
    });
}

/**
 * 修改敏感事件应对方案(原API)
 */
async function _setEventTypePlan(eventId,newClass,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEventTypePlan(eventId,newClass,identity).send({from:account})
        .then(function(result){
            console.log("EventType Class Change Request Send",result);
            result(true)
        }, function(error) {
            console.log("EventType Class Change Failed!",error);
            result(false);
        });
    });
}

/**
 * 修改敏感事件应对方案
 */
async function setEventTypePlan(eventId,newClass){
    var identity = randomNum(100000,999999);
    if(await _setEventTypePlan(eventId,newClass,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('SetEventTypePlan',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 修改敏感事件名称(原API)
 */
async function _setEventTypeName(eventId,newName,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEventTypeName(eventId,newName,identity).send({from:account})
        .then(function(result){
            console.log("EventType Name Change Request Send",result);
            result(true);
        }, function(error) {
            console.log("EventType Name Change Failed!",error);
            result(false);
        });
    });
}

/**
 * 修改敏感事件名称
 */
async function setEventTypeName(eventId,newName){
    var identity = randomNum(100000,999999);
    if(await _setEventTypeName(eventId,newName,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('SetEventTypeName',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 添加事件类型(原API)
 */
async function _addEventType(eventClass,eventName,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventType(eventClass,eventName,identity).send({from:account})
        .then(function(result){
            console.log("Add EventType Request Send",result);
            result(true);
        }, function(error) {
            console.log("Add EventType Failed!",error);
            result(false);
        });
    });
}

/**
 * 添加事件类型
 */
async function addEventType(eventClass,eventName){
    var identity = randomNum(100000,999999);
    if(await _addEventType(eventClass,eventName,identity)==false){
        return false;
    }
    return new Promise(function(result){
        contract.getPastEvents('AddEventType',function(err, res){
            if(err){
                console.log("watcher err",err);
                result(false);
            }else{
                for(var i=0;i<res.length;i++){
                    if(res[i]["returnValues"]["identity"]==identity){
                        result(true);
                    }
                }
            }
        });
    });
}

/**
 * 获取敏感事件类别计数
 */
function getEventsClassCount(eventTypeId){
    return new Promise(function(result){
        contract.methods.getEventsClassCount(eventTypeId).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Info: ",res);
                result(res);
            }
        });
    });
}

// 合约接口API - 待办清单 ----------------------------------------------------

/**
 * 获取代办清单长度
 */
function getToDoListLength(){
    return new Promise(function(result){
        contract.methods.getToDoListLength().call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("To Do List Number: ",number);
                result(number);
            }
        });
    });
}

/**
 * 获取代办清单信息
 */
function getToDoListInfo(id){
    return new Promise(function(result){
        contract.methods.getToDoListInfo(id).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("To Do List Info: ",res);
                result(res);
            }
        });
    });
}

/**
 * 清单信息同意/拒绝(原API)
 */
async function _toDoListDo(index,approve,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(false);
        }
        contract.methods.toDoListDo(index,approve,identity).send({from:account})
        .then(function(result){
            console.log("To do list reply Request Send",result);
        }, function(error) {
            console.log("To do list reply Failed!",error);
            result(false);
        });
    });
}

/**
 * 清单信息同意/拒绝
 */
async function toDoListDo(index,approve){
    var identity = randomNum(100000,999999);
    return new Promise(function(result){
        contract.events.ToDoListDo({},function(err,res){
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
        _toDoListDo(index,approve,identity);
    });
}


// 合约接口API - 敏感事件 ----------------------------------------------------

/**
 * 获取代办清单长度
 */
function getEventLength(deviceId){
    return new Promise(function(result){
        contract.methods.getEventLength(deviceId).call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Number: ",number);
                result(number);
            }
        });
    });
}

/**
 * 获取事件信息
 */
function getEvent(deviceId,index){
    return new Promise(function(result){
        contract.methods.getEvent(deviceId,index).call(function(error, res){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Info: ",res);
                result(res);
            }
        });
    });
}

/**
 * 敏感事件申请
 */
async function _setEvent(_account,password,deviceId,eventId,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            result(2);
        }
        contract.methods.setEvent(_account,password,deviceId,eventId,identity).send({from:account})
        .then(function(res){
            console.log("Set Event Request Send",res);
        }, function(error) {
            console.log("Set Event Failed!",error);
            result(2);
        });
    });
}

/**
 * 清单信息同意/拒绝
 */
async function setEvent(_account,password,deviceId,eventId){
    var identity = randomNum(100000,999999);
    return new Promise(function(result){
        contract.events.SetEvent({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(2);
            }else{
                if(res["returnValues"]["identity"] == identity){
                    this.unsubscribe();
                    result(res["returnValues"][0]);
                }
            }
        });
        _setEvent(_account,password,deviceId,eventId,identity);
    });
}


/*************************************************************************/
/** 工具接口API
 * 生成随机数      randomNum(minNum,maxNum)
 * 生成颜色数组    getColor(len,mode=0)
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

/**
 * 生成颜色数组
 */
function getColor(len,mode=0){
    var colorArray = new Array();
    if(mode==0){
        var colors = ["#8C5E5C","#7CA6AB","#ADA67D","#759C78","#585C86"];
    }
    for(var i=0;i<parseInt(len/colors.length);i++){
        colorArray=colorArray.concat(colors);
    }
    for(var i=0;i<parseInt(len%colors.length);i++){
        colorArray=colorArray.concat(colors[i]);
    }
    return colorArray;
}

