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
 * 登陆                  doLogin()
 * 修改密码               doSetPassword()
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
 * 
 * 事件 ------------------------------------------------------------------
 * 
 * 测试添加事件            doAddEventTest()
 * 同意或拒绝申请          doToDoList(approve)
 * 
 */
/*************************************************************************/

// JS功能API - 账户 -----------------------------------------------------

/** 
 * 登陆
 */
async function doLogin(){
    var password = document.getElementById("UserPassword").value;
    var res = await auth(password);
    if(res==true){
        uiLogin();
    }
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
        alert("Two new Password Not Identical!");
        return false;
    }

    var res = await setPassword(oldPassword,newPassword);
    if(res==true){
        alert("Password Reset");
        document.getElementById("ResetPasswordOld").value="";
        document.getElementById("ResetPasswordNew1").value="";
        document.getElementById("ResetPasswordNew2").value="";
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

    if(info!=false){
        var res=await addDeviceTest(info["account"],info["password"],newName,newDetail);
        if(res!=0){
            alert("Saved new device name",newName);
            uiInitDashboardGallery();
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

    var result = await setDeviceInfo(CURRENT_DEVICE_ID,a,b);
    if(result==true){
        alert("Device Info Changed");
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
    if(CURRENT_DEVICE_ID==-1){
        return;
    }

    document.getElementById("DashboardGalleryWindowB2").disabled="disabled";
    document.getElementById("DashboardGalleryWindowB").disabled="disabled";

    var result = await reduceDevice(CURRENT_DEVICE_ID);
    if(result==true){
        alert("Device Deleted");
        uiInitDashboardGallery();
    }

    document.getElementById("DashboardGalleryWindowB").disabled=false;
    document.getElementById("DashboardGalleryWindowB2").disabled=false;
    document.getElementById("DashboardGalleryWindowBC").click();
    uiInitDashboardGallery();
    CURRENT_DEVICE_ID=-1;
}

// JS功能API - 事件类型 -------------------------------------------------

/**
 * 添加事件类型测试
 */
async function doAddEventTypeTest(){
    var newName = document.getElementById("AddEventTypeTestI").value;
    var newPlan = document.getElementById("AddEventTypeTestS").selectedIndex;
    document.getElementById("AddEventTypeTestI").value="";
    document.getElementById("AddEventTypeTestS").selectedIndex=1;
    document.getElementById("AddEventTypeTestB").disabled="disabled";

    var result = await addEventType(newPlan,newName);
    if(result!=0){ //addEventType()返回添加后的数组长度，错误返回0
        alert("Event Type Added");
        uiInitSettingEventType();
    }else{
        alert("Event Type Add Failed!");
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
        return false;
    }

    var result = await setEventTypeName(num,newName);
    if(result==true){
        alert("Event Type Name Setted");
        uiInitSettingEventType();
    }else{
        alert("Event Type Name Set Failed!");
    }
}

/**
 * 修改记录类型应对方案
 */
async function doSetEventClassPlan(num){
    var newPlan = document.getElementById("ASRS"+num.toString()).selectedIndex;

    var result = await setEventTypePlan(num,newPlan);

    if(result==true){
        alert("Event Type Plan Setted");
    }else{
        alert("Event Type Plan Set Failed!");
    }
}

// JS功能API - 事件 ----------------------------------------------------

/**
 * 添加事件测试
 */
async function doAddEventTest(){
    var account   = document.getElementById("AddEventTestI1").value;
    var password  = document.getElementById("AddEventTestI2").value;
    var deviceId  = document.getElementById("AddEventTestI3").value;
    var eventType = document.getElementById("AddEventTestS").selectedIndex;
    document.getElementById("AddEventTestI1").value="";
    document.getElementById("AddEventTestI2").value="";
    document.getElementById("AddEventTypeTestS").selectedIndex=1;
    document.getElementById("AddEventTypeTestB").disabled="disabled";

    var result = await setEvent(account,password,deviceId,eventType);
    if(result!=2){
        alert("Event Added");
        uiInitDashboardNote();
    }else{
        alert("Event Add Failed!");
    }

    document.getElementById("AddEventTypeTestB").disabled=false;
    document.getElementById("AddEventTypeTestBC").click();
}

/**
 * 同意或拒绝申请
 */
async function doToDoList(approve){
    if(CURRENT_TODOLIST_ID==-1){
        console.log(CURRENT_TODOLIST_ID);
        return;
    }

    var result = await toDoListDo(CURRENT_TODOLIST_ID,approve);
    if(result==true){
        if(approve==true){
            alert("Request Apprrove successful");
        }else{
            alert("Request Reject successful");
        }
    }else{
        alert("Request Reply Failed!");
    }

    document.getElementById("ToDoListB1").disabled=false;
    document.getElementById("ToDoListB2").disabled=false;
    document.getElementById("ToDoListBC").click();
    uiInitDashboardNote();
    CURRENT_TODOLIST_ID=-1;
}


/*************************************************************************/
/** 界面API
 * 
 * 初始化与刷新总函数 --------------------------------------------------------
 * 
 * 初始化界面                       uiInit()
 * 界面刷新                        uiRefresh()
 * 
 * 登陆登出 ----------------------------------------------------------------
 * 
 * 登陆                            uiLogin()
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
 * 添加消息提示显示区                uiAddDashboardNote(toDoListId,deviceId,deviceName,typeName,typeDetail)
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
function uiInit(){
    document.getElementById("UiStatistical").style.display="none";//让表格先加载一下再隐藏
    document.getElementById("UiAfterLogin").style.display="none";//让表格先加载一下再隐藏
    uiInitSetting();
    uiInitDashboard();
}

/**
 * 界面刷新
 */
function uiRefresh(){
    uiInitSetting();
    uiInitDashboard();
    uiInitStatistical();
}

// 界面API - 登陆登出 -----------------------------------------------------

/**
 * 登陆界面切换
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
    var len = await getDeviceLength();
    for(var num = 0;num<len;num++){
        info = await getDeviceInfo(num);
        if(info!=false){
            uiAddDashboardGallery(info[0],info[1],info[2]);
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
function uiAddDashboardGallery(id,name,detail_){
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
        <a class="gallery-popup" data-toggle="modal" onclick="uiWinDashboardGallery('
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

// 目前选择的设备
var CURRENT_DEVICE_ID=-1;

/**
 * 设备操作弹窗
 */
async function uiWinDashboardGallery(id){
    CURRENT_DEVICE_ID = id;
    var info = await getDeviceInfo(CURRENT_DEVICE_ID);
    if(info!=false){
        document.getElementById("DashboardGalleryWindowI1").value=info[1];
        document.getElementById("DashboardGalleryWindowI2").value=info[2];
    }
}

/** 
 * 初始化数据看板界面消息提示显示区
 */
async function uiInitDashboardNote(){
    uiClearDashboardNote();

    var toDoListInfo;
    var deviceName;
    var toDoListLen = await getToDoListLength();
    for(var num = 0;num<toDoListLen;num++){
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
            eventTypeInfo[2],"");
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
function uiAddDashboardNote(toDoListId,deviceId,deviceName,typeName,typeDetail){
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

// 目前选择的申请
var CURRENT_TODOLIST_ID=-1;

/**
 * 申请通过弹窗
 */
async function uiNotificationRecord(id){

    CURRENT_TODOLIST_ID = id;
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
}

/**
 * 绘制设备饼状图
 */
async function uiInitStatisticalDevicePie(){
    document.getElementById("SSimplePie").innerHTML="";

    var deviceNum = await getDeviceNum();
    document.getElementById("SSimplePieH1").innerHTML=deviceNum;
    if(deviceNum==0){
        document.getElementById("SSimplePieP").innerHTML="There is no devices!";
        document.getElementById("SSimplePieH2").innerHTML=0;
        return;
    }
    document.getElementById("SSimplePieP").innerHTML="";

    var eventNum = new Array();
    var eventsNum=0;

    var deviceLength = await getDeviceLength();
    var res;
    var deviceName = new Array();
    for(var num = 0;num<deviceLength;num++){
        res = await getEventLength(num);
        if(res==false) continue;
        eventNum.push(parseInt(res))
        eventsNum+=parseInt(res);
        res = await getDeviceInfo(num);
        deviceName.push(res[1]);
    }
    document.getElementById("SSimplePieH2").innerHTML=eventsNum;

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
 * 绘制类别饼状图
 */
async function uiInitStatisticalEventTypePie(){
    document.getElementById("SSimplePie2").innerHTML="";

    var deviceNum = await getDeviceNum();
    var eventTypeLength = await getEventsClassLength();
    
    document.getElementById("SSimplePie2H1").innerHTML=eventTypeLength;
    if(deviceNum==0){
        document.getElementById("SSimplePie2P").innerHTML="There is no devices!";
        document.getElementById("SSimplePie2H2").innerHTML=0;
        return;
    }
    document.getElementById("SSimplePie2P").innerHTML="";

    var eventNum = new Array();
    var eventsNum=0;

    var res;
    var eventName = new Array();
    for(var num = 0;num<eventTypeLength;num++){
        res = await getEventsClassCount(num);
        if(res==false) continue;
        eventNum.push(parseInt(res));
        eventsNum+=parseInt(res);
        res = await getEventsClassInfo(num);
        eventName.push(res[2]);
    }
    document.getElementById("SSimplePie2H2").innerHTML=eventsNum;

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
    for(var num = 0;num<len;num++){
        info = await getEventsClassInfo(num);
        if(info!=false){
            uiAddSettingEventType(info[0],info[1],info[2]);
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
function uiAddSettingEventType(class_,id_,name_){
    /**
     * ASRS: Add Setting Record Selection, 用于记录修改后的应对方案
     * ASRI: Add Setting Record Input, 用于记录修改后的名称
     */
    var content = document.createElement("div");
    var temp='\
        <h4 class="card-title">\
            <i class="fas fa-address-card"></i><br><br>'+id_.toString()+': '+name_+'\
        </h4>\
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
 * 事件种类设置(下拉框)
 */
function uiAddSettingEventTypeForm(class_){
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


