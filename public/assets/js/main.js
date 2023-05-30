/*************************************************************************/
/** OverView
 * 
 * Auth: Hongtian Shan
 * Mail: charles.shht@gmail.com
 * 
 *     功 能          函数/变量命名法
 * · Web3以及合约           *
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
/** JS功能API
 * 
 * 账户-------------------------------------------------------------------
 * 
 * 登录                  doLogin()
 * 修改密码               doSetPassword()
 * 修改邮箱               doSetEmail()
 * 
 * 设备-------------------------------------------------------------------
 * 
 * 测试添加设备            doAddDeviceTest()
 * 修改设备信息            doEditDevice()
 * 删除设备               doDeleteDevice()
 * 
 * 事件类型 ---------------------------------------------------------------
 * 
 * 添加事件类型测试         doAddEventTypeTest()
 * 修改事件类型名称         doSetEventClassName(num)
 * 修改事件类型方案         doSetEventClassPlan(num)
 * 修改事件类型摄像         doSetEventClassCamera(num)
 * 
 * 事件 ------------------------------------------------------------------
 * 
 * 测试添加事件            doAddEventTest()
 * 同意或拒绝申请          doAddEventApprove(approve)
 * 
 */
/*************************************************************************/

// JS功能API - 账户 -----------------------------------------------------

/** 
 * 登录
 */
async function doLogin(){
    if(await auth(document.getElementById("UserPassword").value))
        uiLogin();
}

/**
 * 修改密码
 */
async function doSetPassword(){
    // 获取密码
    var oldPassword = document.getElementById("ResetPasswordOld").value;
    var newPassword = document.getElementById("ResetPasswordNew1").value;
    var new2Password = document.getElementById("ResetPasswordNew2").value;
    if(newPassword!=new2Password){
        sweetAlert(2,"Two new Password Not Identical!");
        return false;
    }

    if(await setPassword(oldPassword,newPassword)){
        sweetAlert(1,"Set Password");
        document.getElementById("ResetPasswordOld").value="";
        document.getElementById("ResetPasswordNew1").value="";
        document.getElementById("ResetPasswordNew2").value="";
    }else{
        sweetAlert(2,"ReSet Password Failed!");
    }
}

/**
 * 修改邮箱
 */
async function doSetEmail(){
    // 获取密码
    var newEmail = document.getElementById("ResetEmailShow").value;
    
    if(await setEmail(newEmail)){
        sweetAlert(1,"Set Email");
    }else{
        sweetAlert(2,"ReSet Email Failed!");
        uiInitProfile();
    }
}

// JS功能API - 设备 -----------------------------------------------------

/**
 * 测试添加设备
 */
async function doAddDeviceTest(){
    // 获取方案
    var newName = document.getElementById("AddDeviceTestI").value;
    var newDetail = document.getElementById("AddDeviceTestI2").value;
    
    document.getElementById("AddDeviceTestI").value="";
    document.getElementById("AddDeviceTestI2").value="";
    document.getElementById("AddDeviceTestB").disabled="disabled";

    var info = await addAccount(newName,newDetail);
    if(info==false){
        sweetAlert(2,"Fail to add new test device");
    }else{
        if(await addDeviceTest(info["account"],info["password"],newName,newDetail)){
            sweetAlert(1,"added new test device "+newName);
            uiInitDashboardGallery();
        }else{
            sweetAlert(2,"Fail to add new test device");
        }
    }

    document.getElementById("AddDeviceTestB").disabled=false;
    document.getElementById("AddDeviceTestBC").click();
}

/**
 * 修改设备信息
 */
async function doEditDevice(){
    document.getElementById("DashboardGalleryWindowB").disabled="disabled";
    document.getElementById("DashboardGalleryWindowB2").disabled="disabled";
    var a = document.getElementById("DashboardGalleryWindowI1").value;
    var b = document.getElementById("DashboardGalleryWindowI2").value;

    var result = await setDeviceInfo(CURRENT_DEVICE_ADDRESS,a,b);
    if(result==true){
        sweetAlert(1,"Device Info Changed");
        uiInitDashboardGallery();
    }

    document.getElementById("DashboardGalleryWindowB").disabled=false;
    document.getElementById("DashboardGalleryWindowB2").disabled=false;
    document.getElementById("DashboardGalleryWindowBC").click();
}

/**
 * 删除设备
 */
async function doDeleteDevice(){
    if(CURRENT_DEVICE_ADDRESS==0){
        sweetAlert(2,"Fail to Get Current Device!");
        return;
    }

    document.getElementById("DashboardGalleryWindowB2").disabled="disabled";
    document.getElementById("DashboardGalleryWindowB").disabled="disabled";

    var result = await reduceDevice(CURRENT_DEVICE_ADDRESS);
    if(result==true){
        sweetAlert(1,"Device Deleted");
        uiInitDashboardGallery();
    }else{
        sweetAlert(2,"Device Delete Failed");
    }

    document.getElementById("DashboardGalleryWindowB").disabled=false;
    document.getElementById("DashboardGalleryWindowB2").disabled=false;
    document.getElementById("DashboardGalleryWindowBC").click();
    CURRENT_DEVICE_ADDRESS=0;
}

// JS功能API - 事件类型 -------------------------------------------------

/**
 * 添加事件类型测试
 */
async function doAddEventsClassTest(){
    var newName = document.getElementById("AddEventTypeTestI").value;
    var newPlan = document.getElementById("AddEventTypeTestS").selectedIndex+1;
    document.getElementById("AddEventTypeTestI").value="";
    document.getElementById("AddEventTypeTestS").selectedIndex=1;
    document.getElementById("AddEventTypeTestB").disabled="disabled";

    if(await addEventsClassTest(newPlan,newName)){
        sweetAlert(1,"Event Type Added");
        uiInitSettingEventType();
    }else{
        sweetAlert(2,"Event Type Add Failed!");
    }

    document.getElementById("AddEventTypeTestB").disabled=false;
    document.getElementById("AddEventTypeTestBC").click();
}

/**
 * 修改事件类型名称
 */
async function doSetEventClassName(num){
    // 获取名称
    var newName = document.getElementById("ASRI"+num.toString()).value;
    if(newName==""){
        sweetAlert(2,"Get Current Event Type Failed!");
        return false;
    }

    if(await setEventTypeName(num,newName)){
        sweetAlert(1,"Event Type Name Setted");
        uiInitSettingEventType();
    }else{
        sweetAlert(2,"Event Type Name Set Failed!");
    }
}

/**
 * 修改记录类型应对方案
 */
async function doSetEventClassPlan(num){
    var newPlan = document.getElementById("ASRS"+num.toString()).selectedIndex+1;
    
    if(await setEventTypePlan(num,newPlan)){
        sweetAlert(1,"Event Type Plan Setted");
    }else{
        sweetAlert(2,"Event Type Plan Set Failed!");
    }
}

/**
 * 修改记录类型是否打开摄像头
 */
async function doSetEventClassCamera(num){
    var newCamera = document.getElementById("ASRC"+num.toString()).selectedIndex+1;
    
    if(await setEventTypeCamera(num,newCamera)){
        sweetAlert(1,"EventType Camera Config Setted");
    }else{
        sweetAlert(2,"EventType Camera Connfig Set Failed!");
    }
}

// JS功能API - 事件 ----------------------------------------------------

/**
 * 添加事件测试
 */
async function doAddEventTest(){
    var deviceId  = document.getElementById("AddEventTestI3").value;
    var eventType = document.getElementById("AddEventTestS").selectedIndex+1;
    if(isNaN(parseFloat(deviceId))) {sweetAlert(2,"DeviceId should be a number!"); return;}
    if(eventType==1) {sweetAlert(2,"You can't simulate adding Device because decvice exists !"); return;}
    else if(eventType==2) {sweetAlert(2,"Only physical device can set up adding Event Type!"); return;}
    document.getElementById("AddEventTestS").selectedIndex=1;
    document.getElementById("AddEventTestB").disabled="disabled";

    var deviceInfo = await getDeviceInfoByIndex(deviceId);
    if(deviceInfo==false){
        sweetAlert(2,"Failed to get Device Info!");
    }else{
        var result = await addEventTest(deviceInfo[1],eventType);
        if(result==false){
            sweetAlert(2,"Event Add Failed!");
        }else if(result["approve"]==true){
            sweetAlert(1,"Event Approved");
            uiInitDashboardNote();
        }else if(result["wait"]==true){
            sweetAlert(1,"Event Request Send!");
            //uiInitDashboardNote();不要这个!
        }else{
            sweetAlert(2,"Event Rejected!");
        }
    }

    document.getElementById("AddEventTestB").disabled=false;
    document.getElementById("AddEventTestBC").click();
}

/**
 * 同意或拒绝申请
 */
async function doAddEventApprove(approve){
    if(CURRENT_TODOLIST_ID==0||CURRENT_TODOLIST_TYPE==0||CURRENT_TODOLIST_TName==0){
        sweetAlert(2,"Failed to Get Current Info!");
        console.log(CURRENT_TODOLIST_ID);
        console.log(CURRENT_TODOLIST_TYPE);
        console.log(CURRENT_TODOLIST_REAL);
        console.log(CURRENT_TODOLIST_TName);
        return;
    }

    var result;
    if(CURRENT_TODOLIST_TYPE=='addDevice'){
        result = await addDeviceApprove(CURRENT_TODOLIST_ID,approve);
    }else if(CURRENT_TODOLIST_TYPE=='addEventType'){
        result = await addEventsClassApprove(CURRENT_TODOLIST_ID,approve);
    }else if(CURRENT_TODOLIST_TYPE=='addEvent'){
        result = await addEventApprove(CURRENT_TODOLIST_ID,approve);
    }else{
        console.log("Wrong Type!");
    }

    if(!CURRENT_TODOLIST_REAL){
        console.log("A test device event! simulate wating....");
        await addEventReply(CURRENT_TODOLIST_TName);
        console.log("A test device event! simulate done!");
    }
    
    if(result!=false)
        if(approve==true)
            sweetAlert(1,"Request Approve successful");
        else
            sweetAlert(1,"Request Reject successful");
    else
        sweetAlert(2,"Request Reply Failed!");

    document.getElementById("ToDoListB1").disabled=false;
    document.getElementById("ToDoListB2").disabled=false;
    document.getElementById("ToDoListBC").click();
    CURRENT_TODOLIST_ID=0;
    CURRENT_TODOLIST_TYPE=0;
    CURRENT_TODOLIST_TName=0;
    CURRENT_TODOLIST_REAL=0;
    uiInitDashboardNote();
}

/*************************************************************************/
/** 界面API
 * 
 * 初始化与刷新总函数 --------------------------------------------------------
 * 
 * 初始化界面                       uiInit()
 * 界面刷新                        uiRefresh()
 * 
 * 登录登出 ----------------------------------------------------------------
 * 
 * 登录                            uiLogin()
 * 登出                            uiLogout()
 * 
 * Dashboard --------------------------------------------------------------
 * 
 * 切换成Dashboard                 uiToDashboard()
 * 初始化数据看板界面                uiInitDashboard()
 * 初始化数据看板界面设备列表         uiInitDashboardGallery()
 * 清空数据看板界面设备列表           uiClearDashboardGallery()
 * 添加设备                        uiAddDashboardGallery(id,name,detail_)
 * 设备操作弹窗                     uiWinDashboardGallery(id)
 * 初始化数据看板界面消息提示显示区    uiInitDashboardNote()
 * 清除数据看板界面消息提示显示区      uiClearDashboardNote()
 * 添加消息提示显示区                uiAddDashboardNote(toDoListId,deviceId,deviceName,typeName,real,typeDetail)
 * 申请通过弹窗                     uiNotificationRecord(id)
 * 
 * Statistical ------------------------------------------------------------
 * 
 * 切换成Statistical        uiToStatistical()
 * 初始化绘图界面             uiInitStatistical()
 * 绘制设备饼状图             uiInitStatisticalDevicePie()
 * 绘制类别饼状图             uiInitStatisticalEventTypePie()
 * 
 * Profile ----------------------------------------------------------------
 * 
 * 切换成Profile            uiToProfile()
 * 
 * Setting ----------------------------------------------------------------
 * 
 * 切换成Setting            uiToSetting()
 * 初始化设置界面            uiInitSetting()
 * 初始化通用设置界面         uiInitSettingGeneral()
 * 暗黑模式选择              uiChangeColorMode()
 * 左手模式选择              uiChangeRTLMode()
 * 初始化事件类型设置界面      uiInitSettingEventType()
 * 清空事件类型设置界面       uiClearSettingEventType()
 * 事件类型添加界面           uiAddSettingEventType()
 * 事件类型添加界面(下拉框)    uiAddSettingEventTypeForm(class_)
 * 
 */
/*************************************************************************/

// 界面API - 初始化 -------------------------------------------------------

/** 
 * 初始化界面
 */
async function uiInit(){
    document.getElementById("UiStatistical").style.display="none";//让表格先加载一下再隐藏
    document.getElementById("UiAfterLogin").style.display="none";//让表格先加载一下再隐藏
    listenAddDevice();
    listenAddDeviceReply();
    listenAddEventsClass();
    listenAddEventsClassReply();
    listenAddEvent();
    listenAddEventReply();
    uiInitSetting();
    uiInitDashboard();
    uiInitCamera();
}

/**
 * 界面刷新
 */
function uiRefresh(){
    uiInitSetting();
    uiInitDashboard();
    uiInitStatistical();
}

// 界面API - 登录登出 -----------------------------------------------------

/**
 * 登录界面切换
 */
function uiLogin(){
    document.getElementById("UiAfterLogin").style.display="";
    document.getElementById("UiBeforeLogin").style.display="none";
    document.getElementById("page-topbar").style.display="";//显示
    document.getElementById("vertical-menu").style.display="";//显示
}

/**
 * 登出界面切换
 */
function uiLogout(){
    document.getElementById("UiAfterLogin").style.display="none";//隐藏
    document.getElementById("UiBeforeLogin").style.display="";//显示
}

// 界面API - Dashboard --------------------------------------------------------------

/**
 * 切换成Dashboard
 */
function uiToDashboard(){
    document.getElementById("UiDashboard").style.display="";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="";
    uiInitDashboard();
}

/**
 * 初始化数据看板界面
 */
function uiInitDashboard(){
    uiInitDashboardGallery();
    uiInitDashboardNote();
}

/**
 * 初始化数据看板界面设备列表
 */
async function uiInitDashboardGallery(){
    uiClearDashboardGallery();
    var info;
    var len = await getDeviceNum();
    for(var num = 1;num<len+1;num++){
        info = await getDeviceInfoByIndex(num);
        if(info!=false){
            //console.log(info);
            uiAddDashboardGallery(info[0],info[1],info[2],info[3]);
        }
    }
}

/**
 * 清空数据看板界面设备列表
 */
function uiClearDashboardGallery(){

    document.getElementById("DashboardGallery").innerHTML="";
}

/**
 * 添加设备
 */
function uiAddDashboardGallery(id,address,name,detail_){
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
        <a class="gallery-popup" data-toggle="modal" onclick="uiWinDashboardGallery(\''
            +address+'\')"data-target="#DashboardGalleryWindow">\
            <div class="project-item">\
                <div class="overlay-container">\
                    <img src="'+img_path+'" alt="img" class="gallery-thumb-img">\
                    <div class="project-item-overlay">\
                        <h4>'+name+'</h4>\
                        <p>('+id.toString()+') '+detail_+'</p>\
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

// 目前选择的设备
var CURRENT_DEVICE_ADDRESS=0;

/**
 * 设备操作弹窗
 */
async function uiWinDashboardGallery(address){
    CURRENT_DEVICE_ADDRESS = address;
    var info = await getDeviceInfo(CURRENT_DEVICE_ADDRESS);
    if(info!=false){
        document.getElementById("DashboardGalleryWindowI1").value=info[0];
        document.getElementById("DashboardGalleryWindowI2").value=info[1];
    }
}

/** 
 * 初始化数据看板界面消息提示显示区
 */
async function uiInitDashboardNote(){
    // 清空提示区域
    uiClearDashboardNote();

    // 填充新设备添加信息
    var addDeviceInfo;
    var addDeviceName;
    var addDeviceLen = await getAddDevListLen();
    console.log("addDeviceLen: "+addDeviceLen.toString());
    for(var num = 1;num<addDeviceLen+1;num++){
        addDeviceInfo = await getAddDevListInfoByIndex(num);
        if(addDeviceInfo==false){
            continue;
        }else if(addDeviceInfo["read"]==true){
            continue;
        }
        uiAddDashboardNote(
            addDeviceInfo['account'], // account
            -1,               // 没有用
            addDeviceInfo['name'],
            'Add Device',"",true,'addDevice');
    }

    // 填充新申请类型添加信息
    var addEventTypeInfo;
    var addEventTypeName;
    var deviceName;
    var addEventTypeLen = await getAddEventsClassLen();
    console.log("addEventTypeLen: "+addEventTypeLen.toString());
    for(var num = 1;num<addEventTypeLen+1;num++){
        addEventTypeInfo = await getAddEventsClassInfo(num);
        if(addEventTypeInfo==false){
            continue;
        }
        deviceName = await getDeviceInfo(addEventTypeInfo[1]);
        if(deviceName==false){
            continue;
        }
        uiAddDashboardNote(
            addEventTypeInfo[0], // index
            -1,               // 没有用
            deviceName[0],
            'Add Event Type',"",true,'addEventType');
    }

    // 填充设备行为申请信息
    var toDoListInfo;
    var deviceName;
    var eventTypeInfo;
    var toDoListLen = await getToDoListLength();
    console.log("toDoListLen: "+toDoListLen.toString());
    for(var num = 1;num<toDoListLen+1;num++){
        toDoListInfo = await getToDoListInfo(num);
        if(toDoListInfo==false){
            continue;
        }
        deviceName = await getDeviceInfo(toDoListInfo[0]);
        if(deviceName==false){
            continue;
        }
        eventTypeInfo = await getEventsClassInfo(toDoListInfo[1]);
        if(eventTypeInfo==false){
            continue;
        }
        uiAddDashboardNote(
            toDoListInfo[3],
            toDoListInfo[0],
            deviceName[1],
            eventTypeInfo[2],"",toDoListInfo[6],"addEvent");
    }
}

/** 
 * 清除数据看板界面消息提示显示区
 */
function uiClearDashboardNote(){

    document.getElementById("NotificationDiv").innerHTML="";
}

/** 
 * 添加消息提示显示区
 */
function uiAddDashboardNote(toDoListId,deviceId,deviceName,typeName,typeDetail,real,toDoListType='addEvent'){
    if(toDoListType!='addEvent' && toDoListType!='addEventType' && toDoListType!='addDevice' ){
        console.log('wrong `toDoListType`!');
    }
    var title;
    if(real) title="";
    else title="*";
    var temp = '\
    <a href="" class="text-reset notification-item" data-toggle="modal" \
        data-target="#DoAddEventApprove" onclick="uiNotificationRecord(\''+toDoListId.toString()+'\',\''+toDoListType+'\',\''+typeName+'\',\''+real.toString()+'\')">\
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
            <div id=\'real_flag\' title=\''+title+'\'></div>\
        </div>\
    </a>';
    document.getElementById("NotificationDiv").innerHTML+=temp;
}

// 目前选择的申请
var CURRENT_TODOLIST_ID=0;
var CURRENT_TODOLIST_TYPE=0; // 0, 'AddDevice', 'AddEventType', 'AddEvent'
var CURRENT_TODOLIST_TName=0;
var CURRENT_TODOLIST_REAL=0;

/**
 * 申请通过弹窗
 */
async function uiNotificationRecord(id,type,typeName,real){
    CURRENT_TODOLIST_ID = id;
    CURRENT_TODOLIST_TYPE = type;
    CURRENT_TODOLIST_TName = typeName;
    CURRENT_TODOLIST_REAL = (real=='true');
}

/**
 * 监听添加设备
 */
async function listenAddDevice() {
    return new Promise(function(result){
        contract.events.AddDevice({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log(res["returnValues"]);
                cameraServerRun(1);
                if(res["returnValues"]["approve"] == true){
                    console.log("New Device Add!");
                    sweetAlert(1,"Add New Device!");
                    uiInitDashboard();
                    result(true);
                }else if(res["returnValues"]["wait"] == true){
                    console.log("New Device Add Request Get!");
                    uiInitDashboardNote();
                    result(true);
                }
            }
        });
    });
}

/**
 * 监听添加设备回复
 */
async function listenAddDeviceReply() {
    return new Promise(function(result){
        contract.events.AddDeviceReply({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log(res["returnValues"]);
                if(res["returnValues"]["refresh"] == true){
                    sweetAlert(1,"Add New Device!");
                    uiInitDashboard();
                    result(true);
                }
            }
        });
    });
}

/**
 * 监听添加事件类型
 */
async function listenAddEventsClass() {
    return new Promise(function(result){
        contract.events.AddEventsClass({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log(res["returnValues"]);
                cameraServerRun(2);
                if(res["returnValues"]["approve"] == true){
                    console.log("New Events Class Add!");
                    //sweetAlert(1,"Add New Events Class!");
                    uiInitDashboard();
                    uiInitSetting();
                    result(true);
                }else if(res["returnValues"]["wait"] == true){
                    console.log("New Events Class Add Request Get!");
                    uiInitDashboardNote();
                    result(true);
                }
            }
        });
    });
}

/**
 * 监听添加事件类型回复
 */
async function listenAddEventsClassReply() {
    return new Promise(function(result){
        contract.events.AddEventsClassReply({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log(res["returnValues"]);
                if(res["returnValues"]["refresh"] == true){
                    sweetAlert(1,"Add New Events Class!");
                    uiInitDashboard();
                    uiInitSetting();
                    result(true);
                }
            }
        });
    });
}

/**
 * 监听添加事件
 */
async function listenAddEvent() {
    return new Promise(function(result){
        contract.events.AddEvent({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log(res["returnValues"]);
                cameraServerRun(res["returnValues"]["eventId"]);
                if(res["returnValues"]["approve"] == false && res["returnValues"]["wait"] == true){
                    console.log("It's a needing approved New Event Request!");
                    uiInitDashboardNote();
                    result(true);
                }
            }
        });
    });
}

/**
 * 监听添加事件成功
 */
async function listenAddEventReply() {
    return new Promise(function(result){
        contract.events.AddEventReply({},function(err,res){
            if(err){
                console.log("watch err",err);
                result(false);
            }else{
                console.log("New Event Request Get!");
                uiInitDashboardNote();
                result(true);
            }
        });
    });
}

// 界面API - Statistical ------------------------------------------------------------

/**
 * 切换成Statistical
 */
async function uiToStatistical(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="none";
    uiInitStatistical();
}

/**
 * 初始化绘图界面
 */
async function uiInitStatistical(){

    uiInitStatisticalDevicePie();
    uiInitStatisticalEventTypePie();
    uiInitStatisticalDatabase();
}

/**
 * 绘制设备饼状图
 */
async function uiInitStatisticalDevicePie(){
    document.getElementById("SSimplePie").innerHTML="";
    document.getElementById("SSimplePie").style.display="";

    var deviceNum = await getDeviceNum();
    document.getElementById("SSimplePieH1").innerHTML=deviceNum;
    if(deviceNum==0){
        document.getElementById("SSimplePieP").innerHTML="There is no devices!";
        document.getElementById("SSimplePieH2").innerHTML=0;
        document.getElementById("SSimplePie").style.display="none";
        return;
    }
    document.getElementById("SSimplePieP").innerHTML="";

    var eventNum = new Array();
    var eventsNum=0;

    var deviceLength = await getDeviceNum();
    var res;
    var isEmpty=true;
    var deviceName = new Array();
    for(var num = 1;num<deviceLength+1;num++){
        res = await getEventLength(num);
        if(res==false) continue;
        if(res!=0) isEmpty = false;
        eventNum.push(parseInt(res))
        eventsNum+=parseInt(res);
        res = await getDeviceInfoByIndex(num);
        deviceName.push(res["name"]);
    }
    document.getElementById("SSimplePieH2").innerHTML=eventsNum;
    if(isEmpty){
        document.getElementById("SSimplePie").style.display="none";
        document.getElementById("SSimplePieP").innerHTML="There is no events!";
    }

    var colorArray = getColor(deviceLength);

    var ctx = document.getElementById("SSimplePie").getContext('2d');
    
    data = {
        datasets: [
        {
            data: eventNum,backgroundColor: colorArray, hoverBackgroundColor: colorArray, hoverBorderColor: "#fff"
        }],
        labels: deviceName
    };
    let chartStatus = Chart.getChart("SSimplePie");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    
    var myChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

/**
 * 填充表格
 */
async function uiInitStatisticalDatabase(){
    document.getElementById('DataBaseBody').innerHTML="";

    var deviceNum = await getDeviceNum();
    //console.log('*',deviceNum)
    var eventTypeLength = await getEventsClassLength();
    //console.log('*',eventTypeLength);

    var eventInfo;
    var deviceInfo;
    var deviceName;
    var eventName;
    var eventClass;
    var eventTime;
    var eventState;

    if ($('#datatable-buttons').hasClass('dataTable')) {
        var oldTable = $('#datatable-buttons').dataTable();
        oldTable.fnClearTable(); //清空一下table
        oldTable.fnDestroy(); //还原初始化了的dataTable
        //$('#datatable-buttons').empty();
        console.log("重新装填表格")
    }

    for(var i=1;i<=deviceNum;i++){
        for(var j=1;j<=parseInt(await getEventLength(i));j++){
            deviceInfo = await getDeviceInfoByIndex(i);
            eventInfo = await getEvent(i,j);
            deviceName = deviceInfo['name'];
            eventName = await getEventsClassInfo(eventInfo['class']);
            eventClass = eventName['class'];
            if(eventClass==1)
                eventClass="Auto-Approve";
            else if(eventClass==2)
                eventClass="Auto-Approve";
            else if(eventClass==3)
                eventClass="Manual";
            else
                eventClass="Auto-Reject";
            eventName = eventName['name'];
            eventTime = eventInfo['time'];
            if(!eventInfo['state1']&&!eventInfo['state2'])
                eventState = 'Approved';
            else if(!eventInfo['state1']&&eventInfo['state2'])
                eventState = 'Rejected';
            else if(eventInfo['state1']&&eventInfo['state2'])
                eventState = 'Approved';
            else
                eventState = 'Rejected';
            var item = "<tr>\
                <td>"+getTime(eventTime)+"</td>\
                <td>"+deviceName+"</td>\
                <td>"+eventName+"</td>\
                <td>"+eventClass+"</td>\
                <td>"+eventState+"</td>\
                </tr>"
            document.getElementById('DataBaseBody').innerHTML += item;
        }
    }

    $(document).ready(function(){$("#datatable-buttons").DataTable({lengthChange:!1,buttons:["copy","excel","pdf","colvis"]}).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)")});
}
/**
 * 绘制类别饼状图
 */
async function uiInitStatisticalEventTypePie(){
    document.getElementById("SSimplePie2").innerHTML="";
    document.getElementById("SSimplePie2").style.display="";

    var deviceNum = await getDeviceNum();
    var eventTypeLength = await getEventsClassLength();
    
    document.getElementById("SSimplePie2H1").innerHTML=eventTypeLength;
    if(deviceNum==0){
        document.getElementById("SSimplePie2P").innerHTML="There is no devices!";
        document.getElementById("SSimplePie2H2").innerHTML=0;
        document.getElementById("SSimplePie2").style.display="none";
        return;
    }
    document.getElementById("SSimplePie2P").innerHTML="";

    var eventNum = new Array();
    var eventsNum=0;

    var res;
    var eventName = new Array();
    for(var num = 1;num<eventTypeLength+1;num++){
        res = await getEventsClassCount(num);
        if(res==false) continue;
        eventNum.push(parseInt(res));
        eventsNum+=parseInt(res);
        res = await getEventsClassInfo(num);
        eventName.push(res[2]);
    }
    document.getElementById("SSimplePie2H2").innerHTML=eventsNum;
    if(eventsNum==0){
        document.getElementById("SSimplePie2").style.display="none";
    }

    var colorArray = getColor(eventTypeLength);
    

    var ctx = document.getElementById("SSimplePie2").getContext('2d');
    
    data = {
        datasets: [
        {
            data: eventNum,backgroundColor: colorArray, hoverBackgroundColor: colorArray, hoverBorderColor: "#fff"
        }],
        labels: eventName
    };
    let chartStatus = Chart.getChart("SSimplePie2");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    
    var myChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

/**
 * 测试与后台交互
 */
function getData(){

}

// 界面API - Profile ----------------------------------------------------------------

/**
 * 切换成Profile
 */
function uiToProfile(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="";
    document.getElementById("UiSetting").style.display="none";
    document.getElementById("DashboardCreat").style.display="none";
    uiInitProfile();
}

/**
 * 初始化账户界面
 */
async function uiInitProfile(){
    var info = await getEmail();
    document.getElementById("ResetEmailShow").value = info;
    var emailServe = await getEmailServe();
    if(emailServe){
        document.getElementById("SetEmailServe").selectedIndex = "1";
    }else{
        document.getElementById("SetEmailServe").selectedIndex = "0";
    }
}

/**
 * 邮件服务选择
 */
async function doChangeEmailServe(){
    var emailServe = await getEmailServe();
    if(document.getElementById("SetEmailServe").selectedIndex==1){
        if(emailServe==true) return;
        if(await setEmailServe(true)){
            sweetAlert(1,"Open Email Serve");
        }else{
            sweetAlert(2,"Open Email Serve Failed!");
        }
    }else{
        if(emailServe==false) return;
        if(await setEmailServe(false)){
            sweetAlert(1,"Cancel Email Serve");
        }else{
            sweetAlert(2,"Cancel Email Serve Failed!");
        }
    }
}

/**
 * 摄像头服务选择
 */
async function doChangeCameraServe(){
    var cameraServe = await getCameraServe();
    if(document.getElementById("SetCameraServe").selectedIndex==1){
        if(cameraServe==true) return;
        if(await setCameraServe(true)){
            startVideo();
            sweetAlert(1,"Open Camera Serve");
        }else{
            sweetAlert(2,"Open Camera Serve Failed!");
        }
    }else{
        if(cameraServe==false) return;
        if(await setCameraServe(false)){
            closeVideo();
            sweetAlert(1,"Cancel Camera Serve");
        }else{
            sweetAlert(2,"Cancel Camera Serve Failed!");
        }
    }
}

// 界面API - Setting ----------------------------------------------------------------

/**
 * 切换成Settings
 */
function uiToSettings(){
    document.getElementById("UiDashboard").style.display="none";
    document.getElementById("UiStatistical").style.display="none";
    document.getElementById("UiProfile").style.display="none";
    document.getElementById("UiSetting").style.display="";
    document.getElementById("DashboardCreat").style.display="none";
    uiInitSetting();
}


/**
 * 初始化设置界面
 */
function uiInitSetting(){
    uiInitSettingGeneral();
    uiInitSettingEventType();
}


/**
 * 初始化通用设置界面
 */
function uiInitSettingGeneral(){
    if(document.getElementById("light-mode-switch").checked==false){
        document.getElementById("SetColorMode").value="Dark";
    }else{
        document.getElementById("SetColorMode").value="Light";
    }
    if(document.getElementById("rtl-mode-switch").checked==false){
        document.getElementById("SetRTLMode").value="Off";
    }else{
        document.getElementById("SetRTLMode").value="On";
    }
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


/**
 * 初始化事件类型设置界面
 */
async function uiInitSettingEventType(){
    uiClearSettingEventType();
    var info;
    var len = await getEventsClassLength();
    for(var num = 1;num<len+1;num++){
        info = await getEventsClassInfo(num);
        if(info!=false){
            uiAddSettingEventType(info[0],info[1],info[2],info[3]);
        }
    }
}

/**
 * 清空事件类型设置界面
 */
function uiClearSettingEventType(){
    document.getElementById("UiSettingEvent").innerHTML="";
    document.getElementById("AddEventTestS").innerHTML="";
}

/**
 * 事件种类设置
 */
function uiAddSettingEventType(id_,class_,name_,camera_){
    /**
     * ASRC: Add Setting Record Camera, 用于记录修改后的是否开启摄像头记录
     * ASRS: Add Setting Record Selection, 用于记录修改后的应对方案
     * ASRI: Add Setting Record Input, 用于记录修改后的名称
     */
    var content = document.createElement("div");
    var temp='\
        <h4 class="card-title">\
            <i class="fas fa-address-card"></i><br><br>'+id_.toString()+': '+name_+'\
        </h4>\
        <div class="form-group row">\
            <label class="col-sm-2 col-form-label">Camera</label>\
            <div class="col-sm-10">\
                <select class="form-control" id="ASRC'+id_.toString()+'" onchange="doSetEventClassCamera('+id_.toString()+')">'+uiAddSettingEventCameraForm(camera_)+'</select>\
            </div>\
        </div>\
        <div class="form-group row">\
            <label class="col-sm-2 col-form-label">Mode</label>\
            <div class="col-sm-10">\
                <select class="form-control" id="ASRS'+id_.toString()+'" onchange="doSetEventClassPlan('+id_.toString()+')">'+uiAddSettingEventTypeForm(class_)+'</select>\
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
                type="submit" onclick="doSetEventClassName('+id_.toString()+')">Reset Name</button>\
        </div>';
    content.innerHTML=temp;
    document.getElementById("UiSettingEvent").append(content);

    var temp2='<option value='+id_.toString()+'>'+name_+'</option>';
    document.getElementById("AddEventTestS").innerHTML+=temp2;
}

/**
 * 事件种类摄像头意愿(下拉框)
 */
function uiAddSettingEventCameraForm(camera_){
    if(camera_){
        return '<option selected="selected">On</option>\
        <option>Off</option>';
    }else{
        return '<option>On</option>\
        <option selected="selected">Off</option>';
    }
}

/**
 * 事件种类设置(下拉框)
 */
function uiAddSettingEventTypeForm(class_){
    if(class_==1){
        return '<option selected="selected">Plain Mode</option>\
                <option>Normal Mode</option>\
                <option>Warning Mode</option>\
                <option>Reject Mode</option>';
    }else if(class_==2){
        return '<option>Plain Mode</option>\
                <option selected="selected">Normal Mode</option>\
                <option>Warning Mode</option>\
                <option>Reject Mode</option>';
    }else if(class_==3){
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

/////////////////////////////////////////////////////////////
// GPS 部分
/////////////////////////////////////////////////////////////
// 下面部分是定位相关的内容
// 一些全局变量
var gps_data={};
var gps_last_data={};
var gps_last_data_flag=true;
var gps_device_list = {};
// 自动查询位置信息(每2秒钟)
setInterval(function () {
    $.ajax({
        url: 'http://localhost:3000/testInfo',
        type: 'GET',
        success: function (data) {
            gps_data = JSON.parse(data);
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
}, 2000);
// 根据位置信息进行界面更新(每5秒钟)
function gps_data_auto_update(){
    setInterval(function(){
        console.log("GPS Info:\n",Object.keys(gps_device_list).length,gps_device_list);
        // 进行判断设备是否仍然在连接
        if(gps_last_data_flag){
            gps_last_data_flag=false;
            gps_last_data = gps_data;
        }
        for (var val in gps_data) {
            if(val in gps_device_list==false){
                gps_device_list[val] = 8;
                show_position();
            }
            if(gps_data[val].UTCTime!=gps_last_data[val].UTCTime){
                if(gps_device_list[val]!=8)
                    show_position();
                gps_device_list[val] = 8;
                map.removeOverlay(label);
            }
            //console.log(val,gps_last_data[val].UTCTime);
        }
        if(gps_data!={})
        gps_last_data = gps_data;
        // 进行计数（到0显示丢失）
        for(var val in gps_device_list){
            if(gps_device_list[val]==0) {
                disappear_position();
                gps_show_loss_mark(val);
                label.setContent("信号丢失");
                //delete gps_device_list[val];
            }else {
                gps_device_list[val]--;
                gps_show_loss_mark_update(val,gps_device_list[val]);
            }
        }
    },4000);
}
gps_data_auto_update();
// 默认标点
var map = new BMap.Map("gmaps-markers");
map.enableScrollWheelZoom(true);
var point = new BMap.Point(115.838943,28.750448);
map.centerAndZoom(point, 11);

var gps_label_text = "信号丢失";
var label = new BMap.Label(gps_label_text, {       // 创建文本标注
    position: point,                          // 设置标注的地理位置
    //offset: new BMap.Size(10, 20)           // 设置标注的偏移量
})  
label.setStyle({                              // 设置label的样式
    color: '#000',
    fontSize: '30px',
    border: '2px solid #1E90FF'
})
//marker.disableDragging();           // 不可拖拽 var map = new BMap.Map("l-map");  
var marker = new BMap.Marker(point);// 创建标注
// 显示标点
function show_position(){
    map.removeOverlay(marker);
    map.removeOverlay(label);
    map.addOverlay(marker);             // 将标注添加到地图中 
    //map.addOverlay(map_label); 
}
// 清除标点
function disappear_position(){
    map.removeOverlay(marker);
}
// 图像显示
function gps_show_loss_mark(account){
    gps_label_text = "信号丢失";
    map.addOverlay(label);
}
// 数据更新
function gps_show_loss_mark_update(account,n){
    if(n==7) return;
    map.removeOverlay(label);
    label.setContent(n.toString());
    map.addOverlay(label);
}

/////////////////////////////////////////////////////////////
// 摄像头 部分
/////////////////////////////////////////////////////////////
/**
 * 初始化摄像头
 */
async function uiInitCamera(){
    // 开启摄像头
    start.addEventListener('click', doOpenCamera);
    // 关闭摄像头
    close.addEventListener('click', doCloseCamera);
    if(await getCameraServe())startVideo();
    isUseVideo(); // 判断浏览器是否可以调用摄像头
}
let constraints = {
audio: true,
video: {
  width: 400,
  height: 300
}
};
let video = document.getElementById("video");
let start = document.getElementById('CameraOn');
let close = document.getElementById('CameraOff');
let MediaStreamTrack,image,
    canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");
var chunks = [];


// 判断浏览器是否可以调用摄像头
function isUseVideo(){
  // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
  // 使用getUserMedia，因为它会覆盖现有的属性。
  // 这里，如果缺少getUserMedia属性，就添加它。
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      // 首先获取现存的getUserMedia(如果存在)
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      // 有些浏览器不支持，会返回错误信息
      // 保持接口一致
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
      //否则，使用Promise将调用包装到旧的navigator.getUserMedia
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
}


/**
 * 全局开启或关闭摄像头功能
 */

async function doOpenCamera() {
  var cameraServe = await getCameraServe();
  if(cameraServe==true){ startVideo(); return;}
  if(await setCameraServe(true)) {startVideo();
    document.getElementById("SetCameraServe").selectedIndex=1;
  }
  else sweetAlert(2,"Open Camera Serve Failed!");
}
  
async function doCloseCamera(){
  var cameraServe = await getCameraServe();
  if(cameraServe==false){ closeVideo(); return;}
  if(await setCameraServe(false)) {
    closeVideo();
    document.getElementById("SetCameraServe").selectedIndex=0;
  }
  else sweetAlert(2,"Cancel Camera Serve Failed!");
}

// 调用摄像头
function startVideo(){
  console.log("调用摄像头...");
  /**
   * 录像展示的位置
   */
  let promise = navigator.mediaDevices.getUserMedia(constraints);
  promise.then((MediaStream) => {
    /**
     * MediaStream 
     * id: "AfO1m9bSx1TCzvpjKlemjEVWwoVkkg3NbfMP"
     * active: true
     * onaddtrack: null
     * onremovetrack: null
     * onactive: null
     * oninactive: null
     */
    console.log(MediaStream);
    MediaStreamTrack = MediaStream;
    if ("srcObject" in video) {
      video.srcObject = MediaStream;
    } else {
      //避免在新的浏览器中使用它，因为它正在被弃用。
      video.src = window.URL.createObjectURL(MediaStream);
    }
    video.onloadedmetadata = function(e) {
      video.play();
    };
  }).catch((error) => {
    console.info(error);
  });
}
function closeVideo(){
  // 两种方法都可以,这个0是指constraints的对象,下标从后面开始计数
  console.log("停止调用摄像头...");
  MediaStreamTrack && MediaStreamTrack.getVideoTracks()[0].stop();
}

// 截图
function capture(text){
    // canvas画图
    context.drawImage(video, 0, 0, 400, 300);
    watermark(text);
    // 获取图片base64链接
    image = canvas.toDataURL('image/png');

    //将图片添加到页面中
    //document.body.appendChild(img)
    if (image) {
      // 将图片转为file文件格式
      /**
       * File {name: "ssssss", lastModified: 1582789789554, lastModifiedDate: Thu Feb 27 2020 15:49:49 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 34598, …}
        name: "ssssss"
        lastModified: 1582789789554
        lastModifiedDate: Thu Feb 27 2020 15:49:49 GMT+0800 (中国标准时间) {}
        webkitRelativePath: ""
        size: 34598
        type: "image/png"
        __proto__: File
       */
      let res = dataURLtoFile(image, 'ssssss')
      console.log(res)
    }
    //closeVideo()
}
function watermark(text){
    context.font = "24px 宋体";
    context.fillStyle = "#FFC17A";
    context.textAlign = 'left';
    context.fillText(text, 50, canvas.height - 50);
}
// base64转文件
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    });
}

// 保存图片到本地
function getImg(name){
    // 定义一个img
    var img = new Image();
    //设置属性和src
    img.id = "newImg";
    img.src = image;
    img.onload = function(){
      let a = document.getElementById('down');
      a.appendChild(img)
      a.href=image;
      a.download=name+"_"+getNowTime(); // 下载的图片的名称
      a.click()
    }
}

async function cameraServerRun(eventId){
    var info = await getEventsClassInfo(eventId);
    var need1 = info[3];
    var need2 = await getCameraServe();
    if(need1 && need2){
        capture(info["name"]+"\n"+getNowTime2());
        getImg(info["name"]);
        console.log("已保存截图");
        //startVideo();
    }
}
