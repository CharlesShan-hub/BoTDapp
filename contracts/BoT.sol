// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0; 
contract BoT{
    /******************************************************************/
    /** Auth
     * auth        登陆认证
     * setPassword 重制密码
     */
    /******************************************************************/
    string password = "";

    // 认证
    function auth(string memory _password) public view returns(bool){
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
     * 设备数据结构
     * Getter, Setter
     *   getDeviceNum     获取设备数量
     *   getDeviceInfo    获取设备信息
     *   getDeviceInfoByIndex
     *   setDeviceName    设置设备名称
     *   setDeviceInfo    设置设备信息
     *
     * 删除设备
     *   reduceDevice     删除设备
     * 设备认证
     *   authDevice       设备认证
     */
    /******************************************************************/

    // 设备信息
    struct Device{
        address account; // <-判空条件
        string password;
        string name;
        string detail;
    }
    
    mapping(uint8 => Device) public devices;
    uint8 public devicesNum=0;
    mapping(address => uint8) public deviceAccountToIndex;
    mapping(uint8 => address) public deviceIndexToAccount;

    // 设备账户到下标转换函数
    function _deviceAccountToIndex(address account) private view returns(uint8){
        uint8 index = deviceAccountToIndex[account];
        require(devices[index].account!=0x0000000000000000000000000000000000000000);
        return index;
    }

    // 添加设备
    function _addDevice(uint8 i, address _account, string memory _password, string memory _name, string memory _detail) private{
        devices[i].name    =_name;
        devices[i].detail  =_detail;
        devices[i].account =_account;
        devices[i].password=_password;
        deviceIndexToAccount[i] = _account;
        deviceAccountToIndex[_account] = i;
    }

    // 删除设备(仅操作设备列表)
    function _reduceDevice(uint8 i) private{
        deviceAccountToIndex[devices[i].account] = 0;
        
        uint8 last = devicesNum;
        if(i!=last){
            _addDevice(i,devices[last].account,devices[last].password,devices[last].name,devices[last].detail);
        }
        devices[last].account = 0x0000000000000000000000000000000000000000;
        deviceIndexToAccount[last] = 0x0000000000000000000000000000000000000000;
        devicesNum--;
    }

    // 获取设备数量
    function getDeviceNum() view public returns(uint8){
        return devicesNum;
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

    // 删除设备
    event ReduceDevice(uint identity);
    function reduceDevice(address account,uint identity) public{
        // 清除设备列表
        _reduceDevice(_deviceAccountToIndex(account));

        // 清除代办清单
        for(uint8 i=1;i<toDoListLen+1;i++)
            if(toDoList[i].device==account)
                _reduceToDoList(i);

        // 清除申请事件类型清单
        for(uint8 i=1;i<addEventsClassLen+1;i++)
            if(addEventsClassList[i].account==account)
                _reduceAddEventsClass(i);

        // 清除申请信息
        for(uint8 i=1;i<eventsNum[account]+1;i++)
            eventsById[account][i].class=0;
        eventsNum[account]=0;

        // 清除申请种类计数
        for(uint8 i=1;i<eventsClassNum+1;i++){
            eventsClass[i].count-=eventsClass[i].deviceCount[account];
            eventsClass[i].deviceCount[account]=0;
        }
    
        emit ReduceDevice(identity);
    }

    // 设备认证
    function authDevice(address _account, string memory _password) view public returns(bool){
        uint8 index = _addDeviceAccountToIndex(_account);
        return (compareStr(_password,devices[index].password)==true);
    }

    /******************************************************************/
    /** Add Device
     * 添加设备数据结构
     * 
     * Getter, Setter
     *   getAddDevListLen         获取设备申请表长
     *   getAddDevListInfo        获取设备申请信息
     *   getAddDevListInfoByIndex 获取设备申请信息
     * 
     * 添加测试设备
     *   addDeviceTest            添加测试设备
     * 
     * 添加设备申请
     *   addDevice                添加设备申请提交
     *   addDeviceApprove         添加设备申请审批
     *   addDeviceReply           添加设备申请回复
     */
    /******************************************************************/

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
        require(addDeviceList[index].account!=0x0000000000000000000000000000000000000000);
        return index;
    }

    // 获取设备申请表长
    function getAddDevListLen()public view returns(uint8){
        return addDeviceListLen;
    }

    // 获取设备申请信息
    function getAddDevListInfo(address account) view public returns(string memory, string memory,address, string memory,bool,bool){
        uint8 index = _addDeviceAccountToIndex(account);
        return (addDeviceList[index].name,
                addDeviceList[index].detail,
                addDeviceList[index].account,
                addDeviceList[index].password,
                addDeviceList[index].approve,
                addDeviceList[index].read);
    }
    function getAddDevListInfoByIndex(uint8 index) view public returns(uint8, string memory, string memory,address, string memory,bool,bool){
        require(addDeviceList[index].account!=0x0000000000000000000000000000000000000000);
        return (index,
                addDeviceList[index].name,
                addDeviceList[index].detail,
                addDeviceList[index].account,
                addDeviceList[index].password,
                addDeviceList[index].approve,
                addDeviceList[index].read);
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
    event AddDevice(bool approve,bool wait,uint identity);
    function addDevice(address _account, string memory _password, string memory _name, string memory _detail,uint identity) public{
        require(_account!=0x0000000000000000000000000000000000000000);
        if(eventsClass[1].class==4){
            emit AddDevice(false,false,identity);
            return;
        }
        if(eventsClass[1].class<3){
            devicesNum++;
            _addDevice(devicesNum,_account,_password,_name,_detail);
            if(eventsClass[1].class==2){
                eventsClass[1].count++;
                eventsClass[1].deviceCount[_account]++;
                eventsNum[_account]++;
                eventsById[_account][eventsNum[_account]].class==1;
                eventsById[_account][eventsNum[_account]].time==block.timestamp;
                eventsById[_account][eventsNum[_account]].state1==false;
                eventsById[_account][eventsNum[_account]].state2==false;
            }
            emit AddDevice(true,false,identity);
            return;
        }
        if(eventsClass[1].class==3){
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
            emit AddDevice(false,true,identity);
            return;
        }
    }

    // 是否在添加列表中
    function addDeviceState(address account)public view returns(bool,string memory){
        uint8 index = _addDeviceAccountToIndex(account);
        return (addDeviceList[index].approve,addDeviceList[index].password);
    }

    // 添加设备通过
    event AddDeviceApprove(address account, bool approve,uint identity);
    function addDeviceApprove(address _account,bool _approve,uint identity) public{
        uint8 index = _addDeviceAccountToIndex(_account);
        addDeviceList[index].read=true;
        addDeviceList[index].approve=_approve;
        emit AddDeviceApprove(_account,_approve,identity);
    }

    mapping(uint8 => bool) public test; 

    // 批准回复
    event AddDeviceReply(uint identity);
    function addDeviceReply(address account, uint identity)public{
        // 获取设备信息
        test[0] = true;
        uint8 index = _addDeviceAccountToIndex(account);
        require(addDeviceList[index].read==true);

        // 添加设备
        test[1] = true;
        if(addDeviceList[index].approve==true){
            devicesNum++;
            _addDevice(devicesNum, account, addDeviceList[index].password, addDeviceList[index].name, addDeviceList[index].detail);
        }

        // 添加事件记录
        test[2] = true;
        if(addDeviceList[index].approve==true){
            eventsNum[account]++;
            eventsById[account][eventsNum[account]].class=1;
            eventsById[account][eventsNum[account]].time=block.timestamp;
            eventsById[account][eventsNum[account]].state1=true;
            eventsById[account][eventsNum[account]].state2=true;
        }

        // 事件计数
        test[3] = true;
        eventsClass[1].count++;
        eventsClass[1].deviceCount[account]++;

        // 清除添加设备清单
        test[4] = true;
        if(index!=addDeviceListLen){
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
        addDeviceListLen--;

        test[5] = true;

        emit AddDeviceReply(identity);

        test[6] = true;
    }

    /******************************************************************/
    /** 敏感事件类别
     * 数据结构
     * 
     * Getter, Setter
     *   getEventsClassLength    获取敏感事件类型个数
     *   getEventsClassInfo      获取敏感事件信息
     *   getEventsClassCount     获取敏感事件计数
     *   setEventTypePlan        修改敏感事件应对方案
     *   setEventTypeName        修改敏感事件应对名称
     * 
     */
    /******************************************************************/

    // 敏感类别事件描述
    struct EventsClass{
        uint8 class;     // 事件标志(1,2,3,4)
        uint8 count;     // 事件发生次数
        mapping(address => uint8) deviceCount; // 根据设备种类事件发生的次数
        string name;     // 事件名称
    }
    // 注意设备index从1开始, 0代表不存在
    mapping(uint8 => EventsClass) public eventsClass;
    uint8 public eventsClassNum=0;
    mapping(string => uint8) public eventsClassNameToIndex;

    // 获取敏感事件类型个数
    function getEventsClassLength()public view returns(uint8){
        return eventsClassNum;
    }

    // 获取敏感事件信息
    function getEventsClassInfo(uint8 id)public view returns(uint8,uint8,string memory){
        require(eventsClass[id].class!=0);
        return (id,eventsClass[id].class,eventsClass[id].name);
    }

    // 获取敏感事件计数
    function getEventsClassCount(uint8 id)view public returns(uint8){
        require(eventsClass[id].class!=0);
        return eventsClass[id].count;
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

    /******************************************************************/
    /** Add Event Type
     * 添加事件类型数据结构
     * 
     * Getter, Setter
     *   getAddEventsClassLen      获取敏感事件申请表长
     *   getAddEventsClassInfo     获取敏感事件申请信息
     * 
     * 添加测试事件类型
     *   addEventsClassTest        添加测试事件类型
     * 
     * 添加事件类型
     *   addEventsClass            添加事件类型申请
     *   addEventsClassApprove     添加事件类型审批
     *   addEventsClassReply       添加事件类型回复
     */
    /******************************************************************/

    // 添加敏感类别事件申请
    struct AddEventsClassList{
        address account; // 申请添加的设备地址
        uint8 class;     // 事件标志(1,2,3,4)
        string name;     // 事件名称
        bool read;       // 等待批准
        bool approve;    // 批准结果
    }
    mapping(uint8 => AddEventsClassList) public addEventsClassList;
    uint8 public addEventsClassLen=0;

    function _reduceAddEventsClass(uint8 i)public {
        require(addEventsClassList[i].class!=0);
        if(i==addEventsClassLen){
            addEventsClassList[i].account = addEventsClassList[addEventsClassLen].account;
            addEventsClassList[i].class   = addEventsClassList[addEventsClassLen].class;
            addEventsClassList[i].name    = addEventsClassList[addEventsClassLen].name;
            addEventsClassList[i].read    = addEventsClassList[addEventsClassLen].read;
            addEventsClassList[i].approve = addEventsClassList[addEventsClassLen].approve;
        }
        addEventsClassList[addEventsClassLen].class = 0;
        addEventsClassLen--;
    }

    // 获取敏感事件类型序号
    function getEventsClassIndex(string memory name)public view returns(uint8){
        require(eventsClassNameToIndex[name]!=0);
        return eventsClassNameToIndex[name];
    }

    // 获取敏感事件申请表长
    function getAddEventsClassLen()public view returns(uint8){
        return addEventsClassLen;
    }

    // 获取敏感事件申请信息
    function getAddEventsClassInfo(uint8 index) view public returns(uint8, address,uint8, string memory, bool){
        require(addEventsClassList[index].class!=0);
        return (index,
                addEventsClassList[index].account,
                addEventsClassList[index].class,
                addEventsClassList[index].name,
                addEventsClassList[index].approve);
    }

    // 添加测试敏感事件类型
    event AddEventsClassTest(uint8 eventsClassId,uint identity);
    function addEventsClassTest(uint8 eventClass,string memory eventName,uint identity)public{
        require(eventClass>0 && eventClass<5);
        if(eventsClassNameToIndex[eventName]!=0){
             emit AddEventsClassTest(eventsClassNameToIndex[eventName],identity);
             return;
        }
        eventsClassNum++;
        eventsClass[eventsClassNum].class = eventClass;
        eventsClass[eventsClassNum].count = 0;
        eventsClass[eventsClassNum].name = eventName;
        eventsClassNameToIndex[eventName] = eventsClassNum;
        emit AddEventsClassTest(eventsClassNum,identity);
    }

    // 添加敏感类别事件申请
    event AddEventsClass(bool approve,bool wait,uint identity);
    function addEventsClass(address _account, string memory _password, uint8 _class,string memory _name,uint identity) public{
        if(eventsClassNameToIndex[_name]!=0){
             emit AddEventsClass(true,false,identity);
             return;
        }
        require(_account!=0x0000000000000000000000000000000000000000);
        uint8 eventId = addEvent(_account,_password,1,0);
        if(eventId<3){
            emit AddEventsClass(true,false,identity);
        }else if(eventId==4){
            emit AddEventsClass(false,false,identity);
        }else{
            addEventsClassLen++;
            addEventsClassList[addEventsClassLen].account = _account;
            addEventsClassList[addEventsClassLen].class = _class;
            addEventsClassList[addEventsClassLen].name = _name;
            addEventsClassList[addEventsClassLen].read=false;
            addEventsClassList[addEventsClassLen].approve=false;
            emit AddEventsClass(false,true,identity);
        }
    }

    // 添加敏感类别事件通过
    event AddEventsClassApprove(uint8 index, bool approve,uint identity);
    function addEventsClassApprove(uint8 index,bool _approve,uint identity) public{
        require(addEventsClassList[index].class!=0);
        addEventsClassList[index].read=true;
        addEventsClassList[index].approve=_approve;
        emit AddEventsClassApprove(index,_approve,identity);
    }

    // 添加敏感类别事件批准回复
    event AddEventsClassReply(uint identity);
    function addEventsClassReply(uint8 index, uint identity)public{
        // 获取敏感事件信息
        require(addEventsClassList[index].class!=0);
        require(addEventsClassList[index].read==true);
        address account = addEventsClassList[index].account;
        
        // 添加敏感事件
        if(addDeviceList[index].approve==true){
            eventsClassNum++;
            eventsClass[eventsClassNum].class = addEventsClassList[index].class;
            eventsClass[eventsClassNum].count = 0;
            eventsClass[eventsClassNum].name = addEventsClassList[index].name;
        }

        // 添加事件记录
        eventsNum[account]++;
        eventsById[account][eventsNum[account]].class=2;
        eventsById[account][eventsNum[account]].time=block.timestamp;
        eventsById[account][eventsNum[account]].state1=true;
        eventsById[account][eventsNum[account]].state2=addDeviceList[index].approve;

        // 清除新事件类型清单
        _reduceAddEventsClass(index);

        emit AddEventsClassReply(identity);
    }

    /******************************************************************/
    /** 敏感事件
     * 
     * 敏感事件数据结构
     * 
     * getEventLength     获取事件长度函数
     * getEvent           获取事件的测试函数
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
    // 所有设备的事件
    mapping(address => mapping(uint8 => Event)) public eventsById;
    mapping(address => uint8) public eventsNum;
    
    // 获取事件长度函数
    function getEventLength(uint8 deviceId) view public returns(uint){
        require(devices[deviceId].account!=0x0000000000000000000000000000000000000000,
            "Undfined Device");
        return eventsNum[deviceIndexToAccount[deviceId]];
    }

    // 获取事件的测试函数
    function getEvent(uint8 deviceId,uint8 eventId) view public returns(uint8,uint,bool,bool){
        require(devices[deviceId].account!=0x0000000000000000000000000000000000000000,
            "Undefined Device!");
        address _account = deviceIndexToAccount[deviceId];
        require(eventsById[_account][eventId].class!=0,"Undefined Event Class!");
        return (eventsById[_account][eventId].class,
            eventsById[_account][eventId].time,
            eventsById[_account][eventId].state1,
            eventsById[_account][eventId].state2);
    }

    /******************************************************************/
    /** 代办清单
     * 
     * 代办清单数据结构
     * 
     * Geter, Settter
     *  getToDoListLength    获取待办清单长度
     *  getToDoListInfo      获取待办清单信息
     * 
     * 添加事件
     *  addEvent             敏感事件申请
     *  toDoListDo           同意/拒绝
     * 
     */
    /******************************************************************/

    // 敏感事件待办清单
    struct ToDoList{
        address device;   // 设备地址
        uint8 eventType;// 事件类型id
        uint8 refer;    // 在事件列表的下标
    }
    // 每一个设备待处理的事件
    mapping(uint8 => ToDoList) public toDoList;
    uint8 public toDoListLen = 0;

    function _reduceToDoList(uint8 i)private{
        if(i!=toDoListLen){
            toDoList[i].device=toDoList[toDoListLen].device;
            toDoList[i].eventType=toDoList[toDoListLen].eventType;
            toDoList[i].refer=toDoList[toDoListLen].refer;
        }
        toDoList[toDoListLen].device=0x0000000000000000000000000000000000000000;
        toDoListLen--;
    }

    // 获取待办清单长度
    function getToDoListLength()public view returns(uint8){
        return toDoListLen;
    }

    // 获取待办清单信息(返回：设备id,事件类型id,在事件列表的下标)
    function getToDoListInfo(uint8 i)public view returns(address,uint8,uint8,uint8){
        require(toDoList[i].device!=0x0000000000000000000000000000000000000000);
        return (toDoList[i].device,toDoList[i].eventType,toDoList[i].refer,i);
    }

    // 敏感事件申请
    event AddEvent(bool approve,bool wait,uint identity);
    function addEventTest(address _account, uint8 eventId,uint identity) public returns(uint8){
        return _addEvent(_account,eventId,identity);
    }
    function addEvent(address _account, string memory _password, uint8 eventId,uint identity) public returns(uint8){
        // 设备认证
        require(authDevice(_account,_password));
        return _addEvent(_account,eventId,identity);
    }
    function _addEvent(address _account, uint8 eventId,uint identity) public returns(uint8){
        // 事件Id合法认证
        require(eventsClass[eventId].class!=0,"Undefined Class Type!");
        // 进行敏感事件申请
        if(eventsClass[eventId].class==1){
            // 默认自动通过, 不进行记录
            emit AddEvent(true,false,identity);
            return 1;
        }else{
            // 进行计数
            eventsClass[eventId].count++;
            eventsClass[eventId].deviceCount[_account]++;
            eventsNum[_account]++;
            eventsById[_account][eventsNum[_account]].class=eventId;
            eventsById[_account][eventsNum[_account]].time=block.timestamp;
            if(eventsClass[eventId].class==2){
                // 默认记录后通过
                eventsById[_account][eventsNum[_account]].state1=false;
                eventsById[_account][eventsNum[_account]].state2=false;
                emit AddEvent(true,false,identity);
                return 2;
            }else if(eventsClass[eventId].class==3){
                // 需要等待
                eventsById[_account][eventsNum[_account]].state1=true;
                eventsById[_account][eventsNum[_account]].state2=false;
                // 加入申请列表
                toDoListLen++;
                toDoList[toDoListLen].device=_account;
                toDoList[toDoListLen].eventType=eventId;
                toDoList[toDoListLen].refer=eventsClass[eventId].count;
                emit AddEvent(false,true,identity);
                return 3;
            }else{
                // 默认记录后拒绝
                eventsById[_account][eventsNum[_account]].state1=false;
                eventsById[_account][eventsNum[_account]].state2=true;
                emit AddEvent(false,false,identity);
                return 4;
            }
        }
    }

    // 同意/拒绝
    event AddEventApprove(uint identity);
    function addEventApprove(uint8 index,bool approve,uint identity)public {
        require(toDoList[index].device!=0x0000000000000000000000000000000000000000,
            "Cannot find toDoList initiator!");
        require(eventsById[toDoList[index].device][toDoList[index].refer].state1,
            "Not Warning Type");// warning 类型
        eventsById[toDoList[index].device][toDoList[index].refer].state2=approve; // 同意或拒绝
        _reduceToDoList(index);
        emit AddEventApprove(identity);
    }

    /******************************************************************/
    /** 初始化
     * 指定默认密码
     */
    /******************************************************************/
    constructor(){
        // 初始化密码为空
        password="";

        // 初始化事件类别 - 添加新设备申请
        eventsClass[1].class = 3;
        eventsClass[1].count = 0;
        eventsClass[1].name = "Add Device";
        // 初始化事件类别 - 添加新类型申请
        eventsClass[2].class = 2;
        eventsClass[2].count = 0;
        eventsClass[2].name = "Add Event Type";
        eventsClassNum=2;
    }

    /******************************************************************/
    /** Tools
     */
    /******************************************************************/
    // 比较字符串
    function compareStr(string memory _str1, string memory _str2) pure public returns(bool) {
        if(bytes(_str1).length == bytes(_str2).length)
            if(keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2)))
                return true;
        return false;
    }
}