// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0; 
contract BoT{
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
    event SetPassword(uint identity);
    function setPassword(string memory oldPassword,string memory newPassword,uint identity) public{
        require(auth(oldPassword));
        password=newPassword;
        emit SetPassword(identity);
    }

    /******************************************************************/
    /** Device
     */
    /******************************************************************/

    // 设备信息
    struct Device{
        address account;
        string password;
        string name;
        string detail;
    }
    // 注意设备index从1开始, 0代表不存在
    mapping(uint8 => Device) public devices;
    mapping(address => uint8) public deviceAccountToIndex;
    mapping(uint8 => address) public deviceIndexToAccount;
    uint8 public devicesNum=0;

    // 设备账户到下标转换函数
    function _deviceAccountToIndex(address account) private view returns(uint8){
        uint8 index = deviceAccountToIndex[account];
        require(devices[index].account!=0x0000000000000000000000000000000000000000);
        return index;
    }

    // 添加设备
    function _addDevice(uint8 index, address _account, string memory _password, string memory _name, string memory _detail) private{
        devices[index].name    =_name;
        devices[index].detail  =_detail;
        devices[index].account =_account;
        devices[index].password=_password;
        deviceIndexToAccount[index] = _account;
        deviceAccountToIndex[_account] = index;
    }

    // 获取设备数量
    function getDeviceNum() view public returns(uint8){
        return devicesNum;
    }

    // 设置设备名称
    event SetDeviceName(uint identity);
    function setDeviceName(address account,string memory _name,uint identity)public{
        uint8 index=_deviceAccountToIndex(account);
        devices[index].name=_name;
        emit SetDeviceName(identity);
    }

    // 设置设备信息
    event SetDeviceInfo(uint identity);
    function setDeviceInfo(address account,string memory _name,string memory _detail,uint identity)public{
        uint8 index=_deviceAccountToIndex(account);
        devices[index].name=_name;
        devices[index].detail=_detail;
        emit SetDeviceInfo(identity);
    }

    // 获取设备信息
    function getDeviceInfo(address account) view public returns(string memory, string memory){
        uint8 index=_deviceAccountToIndex(account);
        return (devices[index].name,devices[index].detail);
    }
    function getDeviceInfoByIndex(uint8 index) view public returns(uint8, address,string memory, string memory){
        require(devices[index].account!=0x0000000000000000000000000000000000000000);
        return (index,devices[index].account,devices[index].name,devices[index].detail);
    }

    // 添加设备申请
    struct AddDeviceList{
        string name;     // 设备名称
        string detail;   // 设备简介
        address account; // 账户
        string password; // 设备密码
        bool read;       // 等待批准
        bool approve;    // 批准结果
    }
    mapping(uint8 => AddDeviceList) public addDeviceList;
    mapping(address => uint8) public addDeviceAccountToIndex;
    mapping(uint8 => address) public addDeviceIndexToAccount;
    uint8 public addDeviceListLen=0;

    // 设备申请账户到下标转换函数
    function _addDeviceAccountToIndex(address account) private view returns(uint8){
        uint8 index = addDeviceAccountToIndex[account];
        require(index!=0);
        require(addDeviceList[index].account!=0x0000000000000000000000000000000000000000);
        return index;
    }

    // 添加测试设备
    event AddDeviceTest(uint identity);
    function addDeviceTest(address _account, string memory _password, string memory _name, string memory _detail,uint identity) public{
        require(deviceAccountToIndex[_account]==0,"Get repeated account!");
        devicesNum++;
        deviceIndexToAccount[devicesNum] = _account;
        deviceAccountToIndex[_account] = devicesNum;
        devices[devicesNum].account = _account;
        devices[devicesNum].password = _password;
        devices[devicesNum].name = _name;
        devices[devicesNum].detail = _detail;
        emit AddDeviceTest(identity);
    }

    // 添加设备申请
    event AddDevice(bool result,uint identity);
    function addDevice(address _account, string memory _password, string memory _name, string memory _detail,uint identity) public{
        require(_account!=0x0000000000000000000000000000000000000000);
        addDeviceListLen++;
        uint8 index=addDeviceListLen;
        addDeviceAccountToIndex[_account]=index;
        addDeviceIndexToAccount[index]=_account;
        addDeviceList[index].name=_name;
        addDeviceList[index].detail=_detail;
        addDeviceList[index].account=_account;
        addDeviceList[index].password=_password;
        addDeviceList[index].read=false;
        addDeviceList[index].approve=false;
        emit AddDevice(true,identity);
    }

    // 添加设备通过
    event AddDeviceApprove(address account, bool approve,uint identity);
    function addDeviceApprove(address _account,bool _approve,uint identity) public{
        uint8 index = _addDeviceAccountToIndex(_account);
        addDeviceList[index].read=true;
        addDeviceList[index].approve=_approve;
        emit AddDeviceApprove(_account,_approve,identity);
    }

    // 获取设备申请表长
    function getAddDevListLen()public view returns(uint8){
        return addDeviceListLen;
    }

    // 获取设备申请信息
    function getAddDevListInfo(uint8 index) view public returns(uint8, string memory, string memory,address, string memory,bool){
        require(addDeviceList[index].account!=0x0000000000000000000000000000000000000000);
        return (index,
                addDeviceList[index].name,
                addDeviceList[index].detail,
                addDeviceList[index].account,
                addDeviceList[index].password,
                addDeviceList[index].approve);
    }
    function getAddDevListInfoByIndex(address account) view public returns(string memory, string memory,address, string memory,bool){
        uint8 index = _addDeviceAccountToIndex(account);
        return (addDeviceList[index].name,
                addDeviceList[index].detail,
                addDeviceList[index].account,
                addDeviceList[index].password,
                addDeviceList[index].approve);
    }

    // 批准回复
    event AddDeviceReply(uint identity);
    function addDeviceReply(address account, uint identity)public{
        uint8 index = _addDeviceAccountToIndex(account);
        require(addDeviceList[index].read==true);

        if(addDeviceList[index].approve==true){
            devicesNum++;
            _addDevice(devicesNum, account, addDeviceList[index].password, addDeviceList[index].name, addDeviceList[index].detail);
        }
        emit AddDeviceReply(identity);

        addDeviceListLen--;
        if(addDeviceListLen>0 && index!=addDeviceListLen){
            addDeviceList[index].name    =addDeviceList[addDeviceListLen].name;
            addDeviceList[index].detail  =addDeviceList[addDeviceListLen].detail;
            addDeviceList[index].account =addDeviceList[addDeviceListLen].account;
            addDeviceList[index].password=addDeviceList[addDeviceListLen].password;
            addDeviceList[index].read    =addDeviceList[addDeviceListLen].read;
            addDeviceList[index].approve =addDeviceList[addDeviceListLen].approve;
            addDeviceAccountToIndex[addDeviceList[index].account]=index;
            addDeviceIndexToAccount[index]=addDeviceList[index].account;
        }
        addDeviceList[addDeviceListLen].account=0x0000000000000000000000000000000000000000;
    }

    // 删除设备
    event ReduceDevice(uint identity);
    function reduceDevice(address account,uint identity) public{
        // 清除设备列表
        uint8 index = _addDeviceAccountToIndex(account);
        if(index!=devicesNum){
            _addDevice(index,devices[devicesNum].account,devices[devicesNum].password,devices[devicesNum].name,devices[devicesNum].detail);
        }
        devices[devicesNum].account=0x0000000000000000000000000000000000000000;
        deviceAccountToIndex[deviceIndexToAccount[devicesNum]] = 0;
        deviceIndexToAccount[devicesNum] = 0x0000000000000000000000000000000000000000;
        devicesNum--;
        // 清除代办清单
        for(uint8 i=1;i<toDoListLen+1;i++){
            if(toDoList[i].device!=index){
                continue;
            }
            if(i!=toDoListLen){
                toDoList[i].device=toDoList[toDoListLen].device;
                toDoList[i].eventType=toDoList[toDoListLen].eventType;
                toDoList[i].refer=toDoList[toDoListLen].refer;
            }
            toDoList[toDoListLen].device=0;
            toDoListLen--;
        }
        // 清除申请信息
        for(uint8 i=1;i<eventsNum[index]+1;i++){
            eventsById[index][i].class=0;
        }
        eventsNum[index]=0;

        emit ReduceDevice(identity);
    }

    // 设备认证
    function authDevice(address _account, string memory _password) view public returns(bool){
        uint8 index = _addDeviceAccountToIndex(_account);
        return (compareStr(_password,devices[index].password)==true);
    }

    /******************************************************************/
    /** 敏感事件类别
     * 
     */
    /******************************************************************/

    // 敏感类别事件描述
    struct EventsClass{
        uint8 class;     // 事件标志(1,2,3,4)
        uint8 count;     // 事件发生次数
        string name;     // 事件名称
    }
    // 注意设备index从1开始, 0代表不存在
    mapping(uint8 => EventsClass) public eventsClass;
    uint8 public eventsClassNum=0;

    // 获取敏感事件类型个数
    function getEventsClassLength()public view returns(uint8){
        return eventsClassNum;
    }

    // 获取敏感事件信息
    function getEventsClassInfo(uint8 id)public view returns(uint8,uint8,string memory){
        require(eventsClass[id].class!=0);
        return (id,eventsClass[id].class,eventsClass[id].name);
    }

    // 修改敏感事件应对方案
    event SetEventTypePlan(uint identity);
    function setEventTypePlan(uint8 eventId, uint8 planId,uint identity)public{
        require(eventsClass[eventId].class!=0);
        require(planId>0 && planId<5);
        eventsClass[eventId].class = planId;
        emit SetEventTypePlan(identity);
    }

    // 修改敏感事件应对名称
    event SetEventTypeName(uint identity);
    function setEventTypeName(uint8 eventId, string memory eventName,uint identity)public{
        require(eventsClass[eventId].class!=0);
        eventsClass[eventId].name = eventName;
        emit SetEventTypeName(identity);
    }

    // 添加敏感事件类型
    event AddEventType(uint8 eventsClassId,uint identity);
    function addEventType(uint8 eventClass,string memory eventName,uint identity)public{
        require(eventClass>0 && eventClass<5);
        eventsClassNum++;
        eventsClass[eventsClassNum].class = eventClass;
        eventsClass[eventsClassNum].count = 0;
        eventsClass[eventsClassNum].name = eventName;
        emit AddEventType(eventsClassNum,identity);
    }

    // 获取敏感事件计数
    function getEventsClassCount(uint8 id)view public returns(uint8){
        require(eventsClass[id].class!=0);
        return eventsClass[id].count;
    }

    /******************************************************************/
    /** 敏感事件
     * 
     */
    /******************************************************************/

    // 敏感事件
    struct Event{
        uint8 class;  // 事件种类
        uint time;    // 事件申请时间
        bool state1;  // 事件状态 00-Normal,01-reject,10-Waring(未批准),11-Waring(已批准)
        bool state2;
    }
    // 每一个设备的所有事件
    //mapping(uint8 => Event) public events;
    mapping(uint8 => uint8) public eventsNum;
    // 所有设备的事件
    mapping(uint8 => mapping(uint8 => Event)) public eventsById;
    
    // 获取事件长度函数
    function getEventLength(uint8 deviceId) view public returns(uint){
        require(devices[deviceId].account!=0x0000000000000000000000000000000000000000);
        return eventsNum[deviceId];
    }

    // 获取事件的测试函数
    function getEvent(uint8 deviceId,uint8 eventId) view public returns(uint8,uint,bool,bool){
        require(devices[deviceId].account!=0x0000000000000000000000000000000000000000);
        require(eventsById[deviceId][eventId].class!=0);
        return (eventsById[deviceId][eventId].class,
            eventsById[deviceId][eventId].time,
            eventsById[deviceId][eventId].state1,
            eventsById[deviceId][eventId].state2);
    }

    // 敏感事件申请
    // return: 0-通过, 1-等待, 2-拒绝
    event SetEvent(uint res,uint identity);
    function setEvent(address _account, string memory _password, uint8 eventId,uint identity) public{
        // 设备认证失败
        require(authDevice(_account,_password));
        // 事件Id合法认证
        require(eventsClass[eventId].class!=0);
        // 获取设备id
        uint8 deviceId = _deviceAccountToIndex(_account);
        // 进行敏感事件申请
        if(eventsClass[eventId].class==1){
            // 默认自动通过, 不进行记录
            emit SetEvent(0,identity);
        }else{
            // 进行计数
            eventsClass[eventId].count++;
            eventsNum[deviceId]++;
            eventsById[deviceId][eventsNum[deviceId]].class==eventId;
            eventsById[deviceId][eventsNum[deviceId]].time==block.timestamp;
            if(eventsClass[eventId].class==2){
                // 默认记录后通过
                eventsById[deviceId][eventsNum[deviceId]].state1==false;
                eventsById[deviceId][eventsNum[deviceId]].state2==false;
                emit SetEvent(0,identity);
            }else if(eventsClass[eventId].class==3){
                // 需要等待
                eventsById[deviceId][eventsNum[deviceId]].state1==true;
                eventsById[deviceId][eventsNum[deviceId]].state2==false;
                // 加入申请列表
                toDoListLen++;
                toDoList[toDoListLen].device=deviceId;
                toDoList[toDoListLen].eventType=eventId;
                toDoList[toDoListLen].refer=eventsClass[eventId].count;
                emit SetEvent(1,identity);
            }else{
                // 默认记录后拒绝
                eventsById[deviceId][eventsNum[deviceId]].state1==false;
                eventsById[deviceId][eventsNum[deviceId]].state2==true;
                emit SetEvent(2,identity);
            }
        }
    }

    /******************************************************************/
    /** 代办清单
     */
    /******************************************************************/

    // 敏感事件待办清单
    struct ToDoList{
        uint8 device;   // 设备id
        uint8 eventType;// 事件类型id
        uint8 refer;    // 在事件列表的下标
    }
    // 每一个设备待处理的事件
    mapping(uint8 => ToDoList) public toDoList;
    uint8 public toDoListLen = 0;

    // 获取待办清单长度
    function getToDoListLength()public view returns(uint8){
        return toDoListLen;
    }

    // 获取待办清单信息(返回：设备id,事件类型id,在事件列表的下标)
    function getToDoListInfo(uint8 i)public view returns(uint8,uint8,uint8,uint8){
        require(toDoList[i].device!=0);
        return (toDoList[i].device,toDoList[i].eventType,toDoList[i].refer,i);
    }

    // 同意/拒绝
    event ToDoListDo(uint identity);
    function toDoListDo(uint8 index,bool approve,uint identity)public {
        require(toDoList[index].device!=0);
        require(eventsById[toDoList[index].device][toDoList[index].refer].state1);// warning 类型
        eventsById[toDoList[index].device][toDoList[index].refer].state2=approve; // 同意或拒绝
        if(index!=toDoListLen){
            toDoList[index].device=toDoList[toDoListLen].device;
            toDoList[index].eventType=toDoList[toDoListLen].eventType;
            toDoList[index].refer=toDoList[toDoListLen].refer;
        }
        toDoList[toDoListLen].device=0;
        toDoListLen--;
        emit ToDoListDo(identity);
    }

    /******************************************************************/
    /** 初始化
     * 指定默认密码
     */
    /******************************************************************/
    
    constructor(){
        // 初始化密码为空
        password="";

        // 初始化事件类别
            // 为定义的标准事件,默认【同意】，【不记录】
        eventsClass[1].class = 1;
        eventsClass[1].count = 0;
        eventsClass[1].name = "Plain";
            // 为定义的警告事件,默认【同意】并【记录】
        eventsClass[2].class = 2;
        eventsClass[2].count = 0;
        eventsClass[2].name = "Normal";
            // 为定义的警告事件,默认等待，需要【申请】并【记录】
        eventsClass[3].class = 3;
        eventsClass[3].count = 0;
        eventsClass[3].name = "Warning";
            // 为定义的拒绝事件,默认【不同意】并【记录】
        eventsClass[4].class = 4;
        eventsClass[4].count = 0;
        eventsClass[4].name = "Reject";
        eventsClassNum=4;
    }
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