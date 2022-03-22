# BoTDap

## 代码结构

|    类别    |       Solidity函数       |       合约API-Web        |  合约API-Node  |   JS-API-Web    |   JS-API-Node   |         简介         |
| :--------: | :----------------------: | :----------------------: | :------------: | :-------------: | :-------------: | :------------------: |
|    Main    |            -             |            -             |       -        |        -        |  web3Operation  |       控制中枢       |
|            |                          |                          |                |                 |                 |                      |
| Auth-Web3  |            -             |       getAccount0        |  getAccount0   |        -        |        -        |   获取accounts[0]    |
| Auth-Web3  |            -             |      unlockAccount0      | unlockAccount0 |        -        |        -        |   解锁accounts[0]    |
| Auth-Web3  |            -             |        addAccount        |   addAccount   |        -        |        -        |       添加账户       |
| Auth-Web3  |            -             |         transfer         |       -        |        -        |        -        |         转账         |
|    Auth    |           auth           |           auth           |       -        |     doLogin     |        -        |   控制面板身份验证   |
|    Auth    |       setPassword        |       setPassword        |       -        |  doSetPassword  |        -        |   控制面板重设密码   |
|            |                          |                          |                |                 |                 |                      |
|   Device   |       getDeviceNum       |       getDeviceNum       |       -        |        -        |        -        |       设备数量       |
|   Device   |      setDeviceName       |      setDeviceName       |       -        |        -        |        -        |     设置设备名称     |
|   Device   |       getDevieInfo       |      getDeviceInfo       |       -        |        -        |        -        |     获取设备信息     |
|   Device   |   getDevieInfoByIndex    |   getDevieInfoByIndex    |       -        |        -        |        -        |     获取设备信息     |
|   Device   |      setDeviceInfo       |      setDeviceInfo       |       -        |  doEditDevice   |        -        |     设置设备信息     |
|   Device   |      addDeviceTest       |      addDeviceTest       |       -        | doAddDeviceTest |                 |     添加测试设备     |
|   Device   |        addDevice         |            -             |   addDevice    |        -        |   doAddDevice   |       添加设备       |
|   Device   |     addDeviceApprove     |     addDeviceApprove     |       -        |        -        |        -        |     添加设备批准     |
|   Device   |     getAddDevListLen     |     getAddDevListLen     |       -        |                 |        -        |   获取设备申请表长   |
|   Device   |    getAddDevListInfo     |    getAddDevListInfo     |       -        |                 |        -        |   获取设备申请信息   |
|   Device   | getAddDevListInfoByIndex | getAddDevListInfoByIndex |       -        |                 |                 |                      |
|   Device   |      addDeviceReply      |            -             | addDeviceReply |        -        | listenAddDevice |   添加设备批准回复   |
|   Device   |       reduceDevice       |       reduceDevice       |                | doDeleteDevice  |                 |       删除设备       |
|   Device   |        authDevice        |        authDevice        |   authDevice   |        -        |                 |       设备认证       |
|   Device   |            -             |            -             |       -        | listenAddDevice |        -        | 监听添加设备相关事件 |
|            |                          |                          |                |                 |                 |                      |
| EventClass |   getEventsClassLength   |   getEventsClassLength   |                |                 |                 | 获取敏感事件类型个数 |
| EventClass |    getEventsClassInfo    |    getEventsClassInfo    |                |                 |                 |   获取敏感事件信息   |
| EventClass |     setEventTypePlan     |     setEventTypePlan     |                |                 |                 | 修改敏感事件应对方案 |
| EventClass |     setEventTypeName     |     setEventTypeName     |                |                 |                 | 修改敏感事件应对名称 |
| EventClass |       addEventType       |       addEventType       |                |                 |                 |     添加事件类型     |
| EventClass |   getEventsClassCount    |   getEventsClassCount    |                |                 |                 | 获取敏感事件类别计数 |
|            |                          |                          |                |                 |                 |                      |
|  ToDoList  |    getToDoListLength     |    getToDoListLength     |                |                 |                 |   获取待办清单长度   |
|  ToDoList  |     getToDoListInfo      |     getToDoListInfo      |                |                 |                 |   获取待办清单信息   |
|  ToDoList  |        toDoListDo        |        toDoListDo        |       -        |                 |                 |      同意/拒绝       |
|            |                          |                          |                |                 |                 |                      |
|   Event    |      getEventLength      |      getEventLength      |                |                 |                 |   获取敏感事件长度   |
|   Event    |         getEvent         |         getEvent         |                |                 |                 |     获取事件信息     |
|   Event    |         setEvent         |         setEvent         |                |                 |                 |  清单信息同意/拒绝   |
|   Event    |        authEvent         |        authEvent         |                |                 |                 |    事件Id合法认证    |

## 认证

| 类别 | Solidity函数 | 合约API-Web | 合约API-Node | JS-API-Web    | JS-API-Node | 简介             |
| ---- | ------------ | ----------- | ------------ | ------------- | ----------- | ---------------- |
| Auth | auth         | auth        | -            | doLogin       | -           | 控制面板身份验证 |
| Auth | setPassword  | setPassword | -            | doSetPassword | -           | 控制面板重设密码 |
|      |              |             |              |               |             |                  |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over Web,ETH: Init Password is None
Web->>+ETH: Auth
ETH->>-Web: Reply
Web->>+ETH: Set Password
ETH->>-Web: Reply
```

## 认证相关其他内容

|   类别    | Solidity函数 |  合约API-Web   |  合约API-Node  | JS-API-Web | JS-API-Node |      简介       |
| :-------: | :----------: | :------------: | :------------: | :--------: | :---------: | :-------------: |
| Auth-Web3 |      -       |  getAccount0   |  getAccount0   |     -      |      -      | 获取accounts[0] |
| Auth-Web3 |      -       | unlockAccount0 | unlockAccount0 |     -      |      -      | 解锁accounts[0] |
| Auth-Web3 |      -       |   addAccount   |   addAccount   |     -      |      -      |    添加账户     |
| Auth-Web3 |      -       |    transfer    |       -        |     -      |      -      |      转账       |

## 设备信息查改

|  类别  |       Solidity函数        |        合约API-Web        | 合约API-Node |  JS-API-Web  | JS-API-Node |     简介     |
| :----: | :-----------------------: | :-----------------------: | :----------: | :----------: | :---------: | :----------: |
| Device |       getDeviceNum        |       getDeviceNum        |      -       |      -       |      -      |   设备数量   |
| Device |       setDeviceName       |       setDeviceName       |      -       |      -       |      -      | 设置设备名称 |
| Device |       getDevieInfo        |       getDeviceInfo       |      -       |      -       |      -      | 获取设备信息 |
| Device | getDevieInfo<br />ByIndex | getDevieInfo<br />ByIndex |      -       |      -       |      -      | 获取设备信息 |
| Device |       setDeviceInfo       |       setDeviceInfo       |      -       | doEditDevice |      -      | 设置设备信息 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web获取全部设备信息
Web->>ETH:getDeviceNum
activate ETH
ETH->>Web:DeviceNum
deactivate ETH
loop: for i in num
	Web->>ETH:getDeviceInfoByIndex
	activate ETH
	ETH->>Web:DeviceInfo
	deactivate ETH
end

Note over ETH,Web: Web设置某个设备信息
alt
	Web->>ETH:setDeviceName
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH
else
	Web->>ETH:setDeviceInfo
	activate ETH
	ETH->>Web:DeviceInfo
	deactivate ETH
end
```

## 添加测试设备

|  类别  | Solidity函数  |  合约API-Web  | 合约API-Node |   JS-API-Web    | JS-API-Node |     简介     |
| :----: | :-----------: | :-----------: | :----------: | :-------------: | :---------: | :----------: |
| Device | addDeviceTest | addDeviceTest |      -       | doAddDeviceTest |             | 添加测试设备 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web添加测试设备

	Web->>ETH:AddDeviceTest
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH

Note over Web: UI refresh
```

## Tianjiaxinshebei1

| 类别   | Solidity函数             | 合约API-Web              | 合约API-Node   | JS-API-Web      | JS-API-Node     | 简介                           |
| ------ | ------------------------ | ------------------------ | -------------- | --------------- | --------------- | ------------------------------ |
| Device | addDevice                | -                        | addDevice      | -               | doAddDevice     | 添加设备                       |
| Device | addDeviceApprove         | addDeviceApprove         | -              | -               | -               | 添加设备批准                   |
| Device | getAddDevListLen         | getAddDevListLen         | -              |                 | -               | 获取设备申请表长               |
| Device | getAddDevListInfo        | getAddDevListInfo        | -              |                 | -               | 获取设备申请信息               |
| Device | getAddDevListInfoByIndex | getAddDevListInfoByIndex | -              |                 |                 | 获取设备申请信息(By_Device_In) |
| Device | addDeviceReply           | -                        | addDeviceReply | -               | listenAddDevice | 添加设备批准回复               |
| Device | reduceDevice             | reduceDevice             |                | doDeleteDevice  |                 | 删除设备                       |
| Device | authDevice               | authDevice               | authDevice     | -               |                 | 设备认证                       |
| Device | -                        | -                        | -              | listenAddDevice | -               | 监听添加设备相关事件           |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over Devices: New Device wants to add in
Devices->>Http Server: Add Request
activate Http Server
Http Server->>ETH: Add Request
activate ETH
Note over ETH: Add to Add Devices Request Queue
ETH -->>Http Server: (ACK)
deactivate Http Server
ETH->>Web: Notice
activate Web
deactivate ETH
Note over Web: Wait for user
Web->>ETH: Approve/Deny
activate ETH
Note over ETH: Change Add Devices Request Queue Info
ETH -->>Web: (ACK)
deactivate Web
ETH->>Http Server: Approve/Deny
activate Http Server
Http Server -->>ETH: (ACK)
deactivate ETH
Http Server->>Devices: Approve/Deny
Note over Devices: Save Auth Info
Http Server->>ETH: Result Notice
activate ETH
Note over ETH: Clear Add Devices Request Queue
Note over ETH: Add to Device Queue
ETH -->>Http Server: (ACK)
deactivate Http Server
ETH->>Web: Notice
Note over Web: Refresh UI
deactivate ETH


```

## 记录种类类别

|    类别    |     Solidity函数     |     合约API-Web      | 合约API-Node | JS-API-Web | JS-API-Node |         简介         |
| :--------: | :------------------: | :------------------: | :----------: | :--------: | :---------: | :------------------: |
| EventClass | getEventsClassLength | getEventsClassLength |              |            |             | 获取敏感事件类型个数 |
| EventClass |  getEventsClassInfo  |  getEventsClassInfo  |              |            |             |   获取敏感事件信息   |
| EventClass |   setEventTypePlan   |   setEventTypePlan   |              |            |             | 修改敏感事件应对方案 |
| EventClass |   setEventTypeName   |   setEventTypeName   |              |            |             | 修改敏感事件应对名称 |
| EventClass |     addEventType     |     addEventType     |              |            |             |   添加敏感事件类型   |
| EventClass | getEventsClassCount  | getEventsClassCount  |              |            |             |   获取敏感事件类别   |