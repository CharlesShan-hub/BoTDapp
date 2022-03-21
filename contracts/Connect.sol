// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0; 
contract Connect{
    /******************************************************************/
    /** Auth
     */
    /******************************************************************/
    string password = "";

    // 认证
    function auth(string memory _password) public view returns(bool) {
        return compareStr(_password,password);
    }

    // 设置密码
    event SetPassword(bool res,uint identity);
    function setPassword(string memory oldPassword,string memory newPassword,uint identity) public{
        require(auth(oldPassword));
        password=newPassword;
        emit SetPassword(true,identity);
    }

    /******************************************************************/
    /** Device
     */
    /******************************************************************/
    /*
    // 设备信息
    struct Device{
        address account;
        string password;
        string name;
        string detail;
    }
    mapping(uint8 => Device) public devices;
    mapping(address => uint8) public deviceAccountToIndex;
    mapping(uint8 => address) public deviceIndexToAccount;
    uint8 public devicesNum=0;

    // 获取设备数量
    function getDeviceNum() view public returns(uint8){
        return devicesNum;
    }

    // 设置设备名称
    event SetDeviceName(uint identity);
    function setDeviceName(uint8 index,string memory _name,uint identity)public{
        devices[index].name=_name;
        emit SetDeviceName(identity);
    }

    // 获取设备信息
    function getDeviceInfo(uint8 index) view public returns(uint8 id, string memory, string memory){
        require(index<devicesNum);
        require(devices[index].account!=0x0000000000000000000000000000000000000000);
        return (index,devices[index].name,devices[index].detail);
    }

    // 设置设备信息
    event SetDeviceInfo(bool res, uint identity);
    function setDeviceInfo(uint index,string memory _name,string memory _detail,uint identity)public{
        if(index<devices.length && compareStr("",devices[index].password)==false){
            devices[index].name=_name;
            devices[index].detail=_detail;
            emit SetDeviceInfo(true,identity);
        }else{
            emit SetDeviceInfo(false,identity);
        }
    }

    // 添加设备申请
    struct AddDeviceList{
        string name;     // 设备名称
        string detail;   // 设备简介
        address account; // 账户
        string password; // 设备密码
        bool read;       // 等待批准
        bool approve;    // 批准结果
        bool test;
    }
    mapping(uint8 => AddDeviceList) public addDeviceList;
    mapping(address => uint8) public addDeviceAccountToIndex;
    mapping(uint8 => address) public addDeviceIndexToAccount;
    uint8 public addDeviceListLen=0;

    // 添加设备申请
    event AddDevice(bool result,uint identity);
    function addDevice(address _account, string memory _password, string memory _name, string memory _detail,uint identity) public{
        uint8 index=addDeviceListLen;
        addDeviceAccountToIndex[_account]=index;
        addDeviceIndexToAccount[index]=_account;
        addDeviceList[index].name=_name;
        addDeviceList[index].detail=_detail;
        addDeviceList[index].account=_account;
        addDeviceList[index].password=_password;
        addDeviceList[index].read=false;
        addDeviceList[index].approve=false;
        addDeviceListLen++;
        emit AddDevice(true,identity);
    }

    // 添加设备通过
    event AddDeviceApprove(bool result,address account, bool approve,uint identity);
    function addDeviceApprove(address _account,bool _approve,uint identity) public{
        uint8 index = addDeviceAccountToIndex[_account];
        require(compareStr("",addDeviceList[index].password)==false);
        addDeviceList[index].read=true;
        addDeviceList[index].approve=_approve;
        emit AddDeviceApprove(true,_account,_approve,identity);
    }

    // 获取设备申请表长
    function getAddDevListLen()public view returns(uint8){
        return addDeviceListLen;
    }

    // 获取设备申请信息
    function getAddDevListInfo(uint8 index) view public returns(uint8 id, string memory, string memory,address, string memory,bool){
        require(index<addDeviceListLen);
        require(addDeviceList[index].read==false);
        return (index,addDeviceList[index].name,addDeviceList[index].detail,addDeviceList[index].account,addDeviceList[index].password,addDeviceList[index].approve);
    }

    // 批准回复
    event AddDeviceReply(bool result, uint identity);
    function addDeviceReply(address account, uint identity)public{
        uint8 index = addDeviceAccountToIndex[account];
        require(addDeviceList[index].account!=0x0000000000000000000000000000000000000000);
        require(addDeviceList[index].read==true);

        if(addDeviceList[index].approve==true){
            devices.push(Device({
                account:addDeviceList[index].account,
                password:addDeviceList[index].password,
                name:addDeviceList[index].name,
                detail:addDeviceList[index].detail
            }));
            devicesNum++;
        }
        emit AddDeviceReply(true,identity);

        addDeviceListLen--;
        if(addDeviceListLen>0 && index!=addDeviceListLen){
            addDeviceList[index].name    =addDeviceList[addDeviceListLen].name;
            addDeviceList[index].detail  =addDeviceList[addDeviceListLen].detail;
            addDeviceList[index].account =addDeviceList[addDeviceListLen].account;
            addDeviceList[index].password=addDeviceList[addDeviceListLen].password;
            addDeviceList[index].read    =addDeviceList[addDeviceListLen].read;
            addDeviceList[index].approve =addDeviceList[addDeviceListLen].approve;
        }
        addDeviceList[addDeviceListLen].account=0x0000000000000000000000000000000000000000;
    }

    // 添加测试设备
    event AddDeviceTest(uint8 deviceId,uint identity);
    function addDeviceTest(address _account, string memory _password, string memory _name, string memory _detail,uint identity) public{
        devices.push(Device({
            account:_account,
            password:_password,
            name:_name,
            detail:_detail
        }));
        devicesNum++;
        emit AddDeviceTest(uint8(devices.length),identity);
    }

    // 删除设备
    event ReduceDevice(bool res,uint identity);
    function reduceDevice(uint8 index,uint identity) public{
        if(index<devices.length && compareStr("",devices[index].password)==false){
            delete devices[index];
            delete eventsById[index];
            devicesNum--;
            emit ReduceDevice(true,identity);
        }else{
            emit ReduceDevice(false,identity);
        }
    }

    // 设备认证
    function authDevice(address _account, string memory _password, uint index) view public returns(bool){
        if(index+1>devices.length){
            return false;
        }else if(compareStr("",devices[index].password)==true){
            return false;
        }else{
            return (devices[index].account==_account && compareStr(_password,devices[index].password)==true);
        }
    }
*/
    /******************************************************************/
    /** 敏感事件类别
     * 
     */
    /******************************************************************/
    /*
    // 敏感类别事件描述
    struct EventsClass{
        uint8 class;     // 事件标志(0,1,2,3)
        uint8 id;        // 事件id
        string name;     // 事件名称
    }
    EventsClass[] public eventsClass;

    // 获取敏感事件类型个数
    function getEventsClassLength()public view returns(uint){
        return eventsClass.length;
    }

    // 获取敏感事件信息
    function getEventsClassInfo(uint8 id)public view returns(uint8,uint8,string memory){
        return (eventsClass[id].class,id,eventsClass[id].name);
    }

    // 修改敏感事件应对方案
    event SetEventTypePlan(bool res,uint identity);
    function setEventTypePlan(uint8 eventId, uint8 newClass,uint identity)public{
        if(authEvent(eventId)==true && newClass<4){
            eventsClass[eventId].class = newClass;
            emit SetEventTypePlan(true,identity);
        }else{
            emit SetEventTypePlan(false,identity);
        }
    }

    // 修改敏感事件应对名称
    event SetEventTypeName(bool res,uint identity);
    function setEventTypeName(uint8 eventId, string memory eventName,uint identity)public{
        if(authEvent(eventId)==true){
            eventsClass[eventId].name = eventName;
            emit SetEventTypeName(true,identity);
        }else{
            emit SetEventTypeName(false,identity);
        }
    }

    // 自定义敏感事件类型
    event AddEventType(uint res,uint identity);
    function addEventType(uint8 eventClass,string memory eventName,uint identity)public{
        if(eventClass>3){
            emit AddEventType(uint(0),identity);
        }
        eventsClass.push(EventsClass({
            class:eventClass,
            id:uint8(eventsClass.length),
            name:eventName
        }));
        emit AddEventType(uint(eventsClass.length),identity);
    }

    // 每种敏感事件计数
    mapping(uint8 => uint) public eventsClassCountById;

    // 获取敏感事件计数
    function getEventsClassCount(uint8 id)view public returns(uint){
        return eventsClassCountById[id];
    }
*/
    /******************************************************************/
    /** 敏感事件
     * 
     */
    /******************************************************************/
/*
    // 敏感事件
    struct Events{
        uint8 id;     // 事件类型id
        uint time;    // 事件申请时间
        bool state1;   // 事件状态 00-Normal,01-reject,10-Waring(未批准),11-Waring(已批准)
        bool state2;
    }
    // 每一个设备提交的所有事件
    mapping(uint8 => Events[]) public eventsById;

    // 敏感事件待办清单
    struct ToDoList{
        uint8 device;   // 设备id
        uint8 eventType;// 事件类型id
        uint8 refer;    // 在事件列表的下标
    }
    // 每一个设备待处理的事件
    ToDoList[] public toDoList;

    // 获取待办清单长度
    function getToDoListLength()public view returns(uint){
        return toDoList.length;
    }

    // 获取待办清单信息(返回：设备id,事件类型id,在事件列表的下标)
    function getToDoListInfo(uint i)public view returns(uint8,uint8,uint8,uint){
        return (toDoList[i].device,toDoList[i].eventType,toDoList[i].refer,i);
    }

    // 同意/拒绝
    event ToDoListDo(bool res,uint identity);
    function toDoListDo(uint8 index,bool approve,uint identity)public {
        if(toDoList.length>index && eventsById[toDoList[index].device][toDoList[index].refer].state1==true){
            eventsById[toDoList[index].device][toDoList[index].refer].state2=approve;
            if(index!=toDoList.length-1){
                toDoList[index].device=toDoList[toDoList.length-1].device;
                toDoList[index].eventType=toDoList[toDoList.length-1].eventType;
                toDoList[index].refer=toDoList[toDoList.length-1].refer;
            }
            toDoList.pop();
            emit ToDoListDo(true,identity);
        }else{
            emit ToDoListDo(false,identity);
        }
    }
    
    // 获取事件长度函数
    function getEventLength(uint8 deviceId) view public returns(uint){
        require(compareStr("",devices[deviceId].password)==false);
        return (eventsById[deviceId].length);
    }

    // 获取事件的测试函数
    function getEvent(uint8 deviceId,uint8 index) view public returns(uint8,uint,bool,bool){
        require(compareStr("",devices[deviceId].password)==false);
        return (eventsById[deviceId][index].id,
            eventsById[deviceId][index].time,
            eventsById[deviceId][index].state1,
            eventsById[deviceId][index].state2);
    }

    // 敏感事件申请
    // return: 0-通过, 1-等待, 2-失败
    event SetEvent(uint res,uint identity);
    function setEvent(address _account, string memory _password, uint8 deviceId, uint8 eventId,uint identity) public{
        // 设备认证失败
        if(authDevice(_account,_password,deviceId)==false){
            emit SetEvent(2,identity);
        }
        // 事件Id合法认证
        if(authEvent(eventId)==false){
            emit SetEvent(2,identity);
        }
        // 进行计数
        eventsClassCountById[eventId]++;
        // 进行敏感事件申请
        if(eventsClass[eventId].class==0){
            // 默认自动通过, 不进行记录
            emit SetEvent(0,identity);
        }else if(eventsClass[eventId].class==1){
            // 默认记录后通过
            eventsById[deviceId].push(Events({
                id:eventId,
                time: block.timestamp,
                state1:false,
                state2:false
            }));
            emit SetEvent(0,identity);
        }else if(eventsClass[eventId].class==2){
            // 需要等待
            eventsById[deviceId].push(Events({
                id:eventId,
                time: block.timestamp,
                state1:true,
                state2:false
            }));
            // 加入申请列表
            toDoList.push(ToDoList({
                device: deviceId,
                eventType:eventId,
                refer:uint8(eventsById[deviceId].length-1)
            }));
            emit SetEvent(1,identity);
        }else{
            // 默认记录后拒绝
            eventsById[deviceId].push(Events({
                id:eventId,
                time: block.timestamp,
                state1:false,
                state2:true
            }));
            emit SetEvent(2,identity);
        }
    }

    // 事件Id合法认证
    function authEvent(uint8 id)view public returns(bool){
        return id<eventsClass.length;
    }
*/
    /******************************************************************/
    /** 初始化
     * 指定默认密码
     */
    /******************************************************************/
    /*
    constructor(){
        // 初始化密码为空
        password="";

        // 初始化事件类别
        eventsClass.push(EventsClass({
            class:0,
            id:0,
            name:"Plain" // 为定义的标准事件,默认【同意】，【不记录】
        }));
        eventsClass.push(EventsClass({
            class:1,
            id:1,
            name:"Normal" // 为定义的警告事件,默认【同意】并【记录】
        }));
        eventsClass.push(EventsClass({
            class:2,
            id:2,
            name:"Warning" // 为定义的警告事件,默认等待，需要【申请】并【记录】，
        }));
        eventsClass.push(EventsClass({
            class:3,
            id:3,
            name:"Reject" // 为定义的拒绝事件,默认【不同意】并【记录】，
        }));
    }

*/
    /******************************************************************/
    /** Tools
     */
    /******************************************************************/
    // 比较字符串
    function compareStr(string memory _str1, string memory _str2) pure public returns(bool) {
        if(bytes(_str1).length == bytes(_str2).length){
            if(keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2))){
                return true;
            }
        }
        return false;
    }
}