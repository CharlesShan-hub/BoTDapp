/*************************************************************************/
/** 待办清单
 * 设备账户以太低于10eth，就要给他转40
 */
/*************************************************************************/



/*************************************************************************/
/** JS功能API
 * 创建新账户
 */
/*************************************************************************/

/**
 * 首次注册系统/初始化
 */
function initSystem(){
}

/** 
 * 登陆
 */
function login(){
    password = document.getElementById("UserPassword").value;
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.auth(password).call({from:accounts[0]}).then(function(res){
                console.log(password);
                console.log("Send Login Request",res);
                if(res==true){
                    document.getElementById("UiAfterLogin").style.display="";
                    document.getElementById("UiBeforeLogin").style.display="none";
                    document.getElementById("page-topbar").style.display="";//显示
                    document.getElementById("vertical-menu").style.display="";//显示
                }
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        return false;
    });
}

/**
 * 找回密码/修改密码
 */
function resetPassword(){
    // 获取密码
    var oldPassword = document.getElementById("ResetPasswordOld").value;
    var newPassword = document.getElementById("ResetPasswordNew1").value;
    var new2Password = document.getElementById("ResetPasswordNew2").value;
    if(newPassword!=new2Password){
        alert("Two new Password Not Identical!");
        return false;
    }

    // 修改密码
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.setPassword(oldPassword,newPassword).send({from:accounts[0]})
            .then(function(res){
                //console.log(res);
                alert("Password Reset");
                document.getElementById("ResetPasswordOld").value="";
                document.getElementById("ResetPasswordNew1").value="";
                document.getElementById("ResetPasswordNew2").value="";
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        return false;
    }); 
}

/** 
 * 生成新账户
 * 1. 生成账户密码
 * 2. 为帐户分配初始金额
 * 3. 添加账户到以太坊记录
 * ^4. 将账户密码发送给物联网设备
 */
function addAccount(_name,_detail){
    // 1. 生成密码
    var _password = randomNum(10000000,99999999).toString();
    var _account;
    // 2. 为设备生成一个账户
    return new Promise(function(result){
        web3.eth.personal.newAccount(_password).then(function(value) {
            // 为设备生成一个账户 - 成功
            _account = value;
            console.log(_account,_password);

            // 3. 为设备生成的一个账户转1eth
            web3.eth.getAccounts().then(function(accounts){
                if(transfer(accounts[0],password,value.toString(),1)==false){
                    console.log("Fail to creat account");
                    result(false);
                }
                // 4. 以太坊记录新账户
                contract.methods.addDevice(_account,_password,_name,_detail).send({from:accounts[0]},function(error, transactionHash){
                    if(error){
                        console.log("Error",error);
                        result(false);
                    }else{
                        console.log("Send adding new account",transactionHash);
                    }
                }).on('receipt', function(receipt){
                    console.log("Receipt adding request");
                    result({"_account":_account,"_password":_password});
                })
            }, function(reason) {
                // 为设备生成一个账户 - 失败
                console.log("Fail to get accounts list",reason);
                result(false);
            });

        }, function(reason) {
            // 为设备生成一个账户 - 失败
            console.log(reason);
            result(false);
        });
    });
}

/**
 *  转账
 * 1. 根据密码自动解锁
 * 2. 转账
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
 * 设备账户续费
 */
function accountRenewal(){
}

/**
 * 添加设备测试
 */
async function addEquipmentTest(){
    // 获取方案
    var newName = document.getElementById("AddEquipmentTestI").value;
    var newDetail = document.getElementById("AddEquipmentTestI2").value;
    
    document.getElementById("AddEquipmentTestI").value="";
    document.getElementById("AddEquipmentTestI2").value="";
    document.getElementById("AddEquipmentTestB").disabled="disabled";

    var result = await addAccount(newName,newDetail);

    document.getElementById("AddEquipmentTestB").disabled=false;
    document.getElementById("AddEquipmentTestBC").click();
    if(result==false){
        return false;
    }

    console.log(result);

    alert("Saved new device name",newName);
    uiInitDashboardGallery();
}

/**
 * 添加事件类型测试
 */
function addEventTypeTest(){
    // 获取方案
    var newName = document.getElementById("AddEventTypeTestI").value;
    var newPlan = document.getElementById("AddEventTypeTestS").selectedIndex;
    document.getElementById("AddEventTypeTestI").value="";
    document.getElementById("AddEventTypeTestS").selectedIndex=1;
    document.getElementById("AddEventTypeTestB").disabled="disabled";

    // 提交事件类型
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.addEventType(newPlan,newName).send({from:accounts[0]})
            .then(function(res){
                alert("Saved new Event Type");
                document.getElementById("AddEventTypeTestB").disabled=false;
                document.getElementById("AddEventTypeTestBC").click();
                return true;
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            document.getElementById("AddEventTypeTestB").disabled=false;
            document.getElementById("AddEventTypeTestBC").click();
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        document.getElementById("AddEventTypeTestB").disabled=false;
        document.getElementById("AddEventTypeTestBC").click();
        return false;
    });
}

/**
 * 添加事件测试
 */
function addEventTest(){
    // 获取方案
    var account   = document.getElementById("AddEventTestI1").value;
    var password  = document.getElementById("AddEventTestI2").value;
    var deviceId  = document.getElementById("AddEventTestI3").value;
    var eventType = document.getElementById("AddEventTestS").selectedIndex;
    document.getElementById("AddEventTestI1").value="";
    document.getElementById("AddEventTestI2").value="";
    document.getElementById("AddEventTypeTestS").selectedIndex=1;
    document.getElementById("AddEventTypeTestB").disabled="disabled";

    // 提交事件类型
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.eventApply(account,password,deviceId,eventType).send({from:accounts[0]})
            .then(function(res){
                alert("Add New Event",value);
                document.getElementById("AddEventTestB").disabled=false;
                document.getElementById("AddEventTestBC").click();
                return true;
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            document.getElementById("AddEventTestB").disabled=false;
            document.getElementById("AddEventTestBC").click();
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        document.getElementById("AddEventTestB").disabled=false;
        document.getElementById("AddEventTestBC").click();
        return false;
    });
}

/**
 * 修改记录类型应对方案
 */
function resetEventClassPlan(num){
    // 获取方案
    var newPlan = document.getElementById("ASRS"+num.toString()).selectedIndex;

    // 修改密码
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.setEventTypePlan(num,newPlan).send({from:accounts[0]})
            .then(function(res){
                alert("Reset Plan",newPlan);
                //document.getElementById("ASRI"+num.toString()).value="";
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        return false;
    });
}

/**
 * 修改记录类型名称
 */
function resetEventClassName(num){
    // 获取名称
    var newName = document.getElementById("ASRI"+num.toString()).value;
    if(newName==""){
        return false;
    }

    // 修改密码
    web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.setEventTypeName(num,newName).send({from:accounts[0]})
            .then(function(res){
                alert("Reset Name",newName);
                //document.getElementById("ASRI"+num.toString()).value="";
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        return false;
    });
}

/**
 * 修改设备信息
 */
function editDevice(){
    document.getElementById("DashboardGalleryWindowB").disabled="disabled";
    document.getElementById("DashboardGalleryWindowB2").disabled="disabled";
    var a = document.getElementById("DashboardGalleryWindowI1").value;
    var b = document.getElementById("DashboardGalleryWindowI2").value;

    // 提交事件类型
        web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.setDeviceInfo(CURRENT_DEVICE_ID,a,b).send({from:accounts[0]})
            .then(function(res){
                alert("Save Device Info",value);
                document.getElementById("DashboardGalleryWindowB").disabled=false;
                document.getElementById("DashboardGalleryWindowB2").disabled=false;
                document.getElementById("DashboardGalleryWindowBC").click();
                uiInitDashboardGallery();
                return true;
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            document.getElementById("DashboardGalleryWindowB").disabled=false;
            document.getElementById("DashboardGalleryWindowB2").disabled=false;
            document.getElementById("DashboardGalleryWindowBC").click();
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        document.getElementById("DashboardGalleryWindowB").disabled=false;
        document.getElementById("DashboardGalleryWindowB2").disabled=false;
        document.getElementById("DashboardGalleryWindowBC").click();
        return false;
    });
}


/**
 * 修改设备信息
 */
function deleteDevice(){
    if(CURRENT_DEVICE_ID==-1){
        return;
    }

    document.getElementById("DashboardGalleryWindowB2").disabled="disabled";
    document.getElementById("DashboardGalleryWindowB").disabled="disabled";
    
    // 提交事件类型
        web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.reduceDevice(CURRENT_DEVICE_ID).send({from:accounts[0]})
            .then(function(res){
                alert("Deleted Device",value);
                document.getElementById("DashboardGalleryWindowB").disabled=false;
                document.getElementById("DashboardGalleryWindowB2").disabled=false;
                document.getElementById("DashboardGalleryWindowBC").click();
                uiInitDashboardGallery();
                CURRENT_DEVICE_ID=-1;
                return true;
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            document.getElementById("DashboardGalleryWindowB").disabled=false;
            document.getElementById("DashboardGalleryWindowB2").disabled=false;
            document.getElementById("DashboardGalleryWindowBC").click();
            CURRENT_DEVICE_ID=-1;
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        document.getElementById("DashboardGalleryWindowB").disabled=false;
        document.getElementById("DashboardGalleryWindowB2").disabled=false;
        document.getElementById("DashboardGalleryWindowBC").click();
        CURRENT_DEVICE_ID=-1;
        return false;
    });
}

/**
 * 同意或拒绝申请
 */
function toDoList(approve){
    if(CURRENT_TODOLIST_ID==-1){
        console.log(CURRENT_TODOLIST_ID);
        return;
    }
    // 提交事件类型
        web3.eth.getAccounts().then(function(accounts){
        web3.eth.personal.unlockAccount(accounts[0],"").then(function(value){
            // 解锁账户 - 成功
            contract.methods.toDoListDo(CURRENT_TODOLIST_ID,approve).send({from:accounts[0]})
            .then(function(res){
                alert("Operated Request",value);
                document.getElementById("ToDoListB1").disabled=false;
                document.getElementById("ToDoListB2").disabled=false;
                document.getElementById("ToDoListBC").click();
                uiInitDashboardGallery();
                CURRENT_TODOLIST_ID=-1;
                return true;
            });
        }, function(reason) {
            // 解锁账户 - 失败
            console.log("unlockAccount failed",reason);
            alert("Wrong Password!");
            document.getElementById("ToDoListB1").disabled=false;
            document.getElementById("ToDoListB2").disabled=false;
            document.getElementById("ToDoListBC").click();
            CURRENT_TODOLIST_ID=-1;
            return false;
        });
    }, function(reason) {
        // 获取账户 - 失败
        console.log("Fail to get accounts list",reason);
        alert("Please check you internet!");
        document.getElementById("ToDoListB1").disabled=false;
        document.getElementById("ToDoListB2").disabled=false;
        document.getElementById("ToDoListBC").click();
        CURRENT_TODOLIST_ID=-1;
        return false;
    });
}


/*************************************************************************/
/** 界面API
 * 创建新账户
 */
/*************************************************************************/

/** 
 * 初始化界面
 */
function uiInit(){
    document.getElementById("UiStatistical").style.display="none";//让表格先加载一下再隐藏
    document.getElementById("UiAfterLogin").style.display="none";//让表格先加载一下再隐藏
    uiInitSettingRecord();
    uiInitDashboardGallery();
    uiInitNotification();
}

function uiRefresh(){
    uiInitSettingRecord();
    uiInitDashboardGallery();
    uiInitNotification();
}

async function uiInitStatistical1(){
    document.getElementById("SSimplePie").innerHTML="";
    var ctx = document.getElementById("SSimplePie");

    //var length = await addAccount(newName,newDetail);
    data = {
        datasets: [
        {
            data: [300, 180],backgroundColor: ["#02a499", "#ebeff2"], hoverBackgroundColor: ["#02a499", "#ebeff2"], hoverBorderColor: "#fff"
        }],
        labels: ["Red", "Yellow"]
    };
    var myChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

function uiInitSettingRecord(){
    uiClearSettingRecord();
    contract.methods.getEventsClassLength()
        .call(function(error, result){
            if(error){
                console.log("Error: ",error);
            }else{
                console.log("Member Number: ",result);
                for(var num = 0;num<result;num++){
                    contract.methods.getEventsClassInfo(num).call(
                    function(error, result){
                        if(error){
                            console.log("Error: ",error);
                        }else{
                            uiAddSettingRecord(result[2],result[0],result[1]);
                        }
                    });
                }
            }   
        }
    );
}

function uiInitDashboardGallery(){
    uiClearDashboardGallery();
    contract.methods.getDeviceLength()
        .call(function(error, result){
            if(error){
                console.log("Error: ",error);
            }else{
                console.log("Member Number: ",result);
                for(var num = 0;num<result;num++){
                    contract.methods.getDeviceInfo(num).call(
                    function(error, result){
                        if(error){
                            console.log("Error: ",error);
                        }else{
                            uiAddEquipment(result[1],result[0],result[2]);//name
                        }
                    });
                }
            }
        }
    );
}

/** 
 * 初始化消息提示显示区
 */
function uiInitNotification(){
    uiClearNotification();
    // 获取代办信息列表长度
    contract.methods.getToDoListLength()
        .call(function(error, count){
            if(error){
                console.log("Error: ",error);
            }else{
                console.log("Member Number: ",count);
                for(var num = 0;num<count;num++){
                    // 获取每个代办信息内容
                    contract.methods.getToDoListInfo(num).call(
                    function(error, result){
                        if(error){
                            console.log("Error: ",error);
                        }else{
                            // 获取每个代办信息 设备名称
                            contract.methods.getDeviceInfo(result[0]).call(
                                function(error, name){
                                if(error){
                                    console.log("Error: ",error);
                                }else{
                                    // 获取每一个代办信息 事件类型名称
                                    contract.methods.getEventsClassInfo(result[1]).call(
                                    function(error, typeName){//typeName[2]
                                        if(error){
                                            console.log("Error: ",error);
                                        }else{
                                            console.log(result[0],name[1],typeName[2],result[3]);
                                            uiAddNotification(result[3],result[0],name[1],typeName[2],"");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    );
}



/**
 * 变换成Dashboard
 */
function uiToDashboard(){
    document.getElementById("UiDashboard").style.display="";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="";
}

/**
 * 变换成Statistical
 */
function uiToStatistical(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="none";
    uiInitStatistical1();
}

/**
 * 变换成Profile
 */
function uiToProfile(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="none";
}

/**
 * 变换成Settings
 */
function uiToSettings(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="";
    document.getElementById("DashboardCreat").style.display="none";
    uiInitSettingRecord();
}

/*
/**
 * 变换成登陆界面
 */
function uiToLogin(){
    document.getElementById("UiAfterLogin").style.display="none";//隐藏
    document.getElementById("UiBeforeLogin").style.display="";//显示
}


/**
 * 添加设备(初始化设备列表的添加设备)
 */
function uiAddEquipment(name,id,detail_){
    var img_path="assets/images/gallery/"+id.toString()+".jpg";
    var detail="";
    for(var i=0;i<detail_.split(" ").length;i++){
        detail+=detail_.split(" ")[i];
        detail+=" ";
        if(i%4==0&&i!=0){
            detail+='<br>';
        }
    }
    var temp='\
        <a class="gallery-popup" data-toggle="modal" onclick="uiEquipmentRecord('
            +id.toString()+')"data-target="#DashboardGalleryWindow">\
            <div class="project-item">\
                <div class="overlay-container">\
                    <img src="'+img_path+'" alt="img" class="gallery-thumb-img">\
                    <div class="project-item-overlay">\
                        <h4>'+name+'</h4>\
                        <p>'+detail+'</p>\
                    </div>\
                </div>\
            </div>\
        </a>\
    ';
    var content = document.createElement("div");
    content.setAttribute("class", "col-xl-3 col-md-6");
    content.innerHTML=temp;
    document.getElementById("DashboardGallery").append(content);
}
function uiClearDashboardGallery(){
    document.getElementById("DashboardGallery").innerHTML="";
}
var CURRENT_DEVICE_ID=-1;
function uiEquipmentRecord(id){
    CURRENT_DEVICE_ID = id;
    console.log(CURRENT_DEVICE_ID);
    contract.methods.getDeviceInfo(CURRENT_DEVICE_ID).call(function(error, result){
        if(error){
            console.log("Error: ",error);
        }else{
            document.getElementById("DashboardGalleryWindowI1").value=result[1];
            document.getElementById("DashboardGalleryWindowI2").value=result[2];
        }
    });
}

/**
 * 敏感记录查询
 */
function uiSearchRecord(){
}

/**
 * 敏感记录种类设置
 * ASRS: Add Setting Record Selection, 用于记录修改后的应对方案
 * ASRI: Add Setting Record Input, 用于记录修改后的名称
 */
function uiAddSettingRecord(name_,class_,id_){
    var content = document.createElement("div");
    var temp='\
        <h4 class="card-title">\
            <i class="fas fa-address-card"></i><br><br>'+id_.toString()+': '+name_+'\
        </h4>\
        <div class="form-group row">\
            <label class="col-sm-2 col-form-label">Mode</label>\
            <div class="col-sm-10">\
                <select class="form-control" id="ASRS'+id_.toString()+'" onchange="resetEventClassPlan('+id_.toString()+')">'+uiAddSettingRecordForm(class_)+'</select>\
            </div>\
        </div>\
        <div class="form-group row">\
            <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>\
            <div class="col-sm-10">\
            <input class="form-control" type="text" value="'+name_+'" id="ASRI'+id_.toString()+'">\
            </div>\
        </div>\
        <div class="col-sm-12 text-right">\
            <button class="btn btn-primary w-md waves-effect waves-light" \
                type="submit" onclick="resetEventClassName('+id_.toString()+')">Reset Name</button>\
        </div>';
    content.innerHTML=temp;
    document.getElementById("UiSettingEvent").append(content);

    var temp2='<option value='+id_.toString()+'>'+name_+'</option>';
    console.log(temp2);
    document.getElementById("AddEventTestS").innerHTML+=temp2;
}
function uiClearSettingRecord(){
    document.getElementById("UiSettingEvent").innerHTML="";
    document.getElementById("AddEventTestS").innerHTML="";
}
function uiAddSettingRecordForm(class_){
    if(class_==0){
        return '<option selected="selected">Plain Mode</option>\
                <option>Normal Mode</option>\
                <option>Warning Mode</option>\
                <option>Reject Mode</option>';
    }else if(class_==1){
        return '<option>Plain Mode</option>\
                <option selected="selected">Normal Mode</option>\
                <option>Warning Mode</option>\
                <option>Reject Mode</option>';
    }else if(class_==2){
        return '<option>Plain Mode</option>\
                <option>Normal Mode</option>\
                <option selected="selected">Warning Mode</option>\
                <option>Reject Mode</option>';
    }else{
        return '<option >Plain Mode</option>\
                <option>Normal Mode</option>\
                <option>Warning Mode</option>\
                <option selected="selected">Reject Mode</option>';
    }
}

/** 
 * 初始化消息提示显示区
 */
function uiAddNotification(toDoListId,deviceId,deviceName,typeName,typeDetail){
    //var content = document.getElementById("NotificationDiv");
    var temp = '\
    <a href="" class="text-reset notification-item" data-toggle="modal" \
        data-target="#DoToDoList" onclick="uiNotificationRecord('+toDoListId.toString()+')">\
        <div class="media">\
            <div class="avatar-xs mr-3">\
                <span class="avatar-title bg-success rounded-circle font-size-16">\
                    <i class="mdi mdi-cart-outline"></i>\
                </span>\
            </div>\
            <div class="media-body">\
                <h6 class="mt-0 mb-1">'+typeName+'</h6>\
                <div class="font-size-12 text-muted">\
                    <p class="mb-1">'+deviceName+'</p>\
                </div>\
            </div>\
        </div>\
    </a>';
    document.getElementById("NotificationDiv").innerHTML+=temp;
}
function uiClearNotification(){
    document.getElementById("NotificationDiv").innerHTML="";
}
var CURRENT_TODOLIST_ID=-1;
function uiNotificationRecord(id){
    CURRENT_TODOLIST_ID = id;
    console.log(CURRENT_TODOLIST_ID);
    /*contract.methods.getDeviceInfo(CURRENT_DEVICE_ID).call(function(error, result){
        if(error){
            console.log("Error: ",error);
        }else{
            document.getElementById("DashboardGalleryWindowI1").value=result[1];
            document.getElementById("DashboardGalleryWindowI2").value=result[2];
        }
    });*/
}


/**
 * 暗黑模式选择
 */
function uiChangeColorMode(){
    if(document.getElementById("SetColorMode").selectedIndex==0){
        document.getElementById("light-mode-switch").click();
    }else{
        document.getElementById("dark-mode-switch").click();
    }
}

/**
 * 左手模式选择
 */
function uiChangeRTLMode(){
    if(document.getElementById("SetRTLMode").selectedIndex==1){
        document.getElementById("rtl-mode-switch").click();
    }else{
        if(document.getElementById("SetColorMode").selectedIndex==0){
            document.getElementById("light-mode-switch").click();
        }else{
            document.getElementById("dark-mode-switch").click();
        }
    }
    
}

