# BoTDap



[TOC]

## 认证

| 类别 | Solidity函数 | 合约API-Web | 合约API-Node | JS-API-Web    | JS-API-Node | 简介             |
| ---- | ------------ | ----------- | ------------ | ------------- | ----------- | ---------------- |
| Auth | auth         | auth        | -            | doLogin       | -           | 控制面板身份验证 |
| Auth | setPassword  | setPassword | -            | doSetPassword | -           | 控制面板重设密码 |

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

主要用于Web和Http Server的Web3.js中的操作，辅助合约函数运行。

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
| Device |       getDevieInfo        |       getDeviceInfo       |      -       |      -       |      -      | 获取设备信息 |
| Device | getDevieInfo<br />ByIndex | getDevieInfo<br />ByIndex |      -       |      -       |      -      | 获取设备信息 |
| Device |       setDeviceName       |       setDeviceName       |      -       |      -       |      -      | 设置设备名称 |
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
	ETH-->>Web:ACK
	deactivate ETH
end
```

## 添加测试设备

|  类别  | Solidity函数  |  合约API-Web  | 合约API-Node |   JS-API-Web    | JS-API-Node |     简介     |
| :----: | :-----------: | :-----------: | :----------: | :-------------: | :---------: | :----------: |
| Device | addDeviceTest | addDeviceTest |      -       | doAddDeviceTest |      -      | 添加测试设备 |

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

## 删除设备

删除设备操作会删除这个设备的一切历史信息，包括：设备信息，设备敏感事件申请记录，代办清单中该设备申请记录，事件列表中该设备的申请次数。

|  类别  | Solidity函数 | 合约API-Web  | 合约API-Node |   JS-API-Web   | JS-API-Node |   简介   |
| :----: | :----------: | :----------: | :----------: | :------------: | :---------: | :------: |
| Device | reduceDevice | reduceDevice |              | doDeleteDevice |             | 删除设备 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web删除设备

	Web->>ETH:ReduceDevice
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH

Note over Web: UI refresh
```

## 设备认证

设备认证函数目前主要用于合约运行中的验证操作方为注册的设备

|  类别  | Solidity函数 | 合约API-Web | 合约API-Node | JS-API-Web | JS-API-Node |   简介   |
| :----: | :----------: | :---------: | :----------: | :--------: | :---------: | :------: |
| Device |  authDevice  | authDevice  |  authDevice  |     -      |             | 设备认证 |

## 添加设备

| 类别   | Solidity函数             | 合约API-Web              | 合约API-Node   | JS-API-Web      | JS-API-Node     | 简介                           |
| ------ | ------------------------ | ------------------------ | -------------- | --------------- | --------------- | ------------------------------ |
| Device | getAddDevListLen         | getAddDevListLen         | -              |                 | -               | 获取设备申请表长               |
| Device | getAddDevListInfo        | getAddDevListInfo        | -              |                 | -               | 获取设备申请信息               |
| Device | getAddDevListInfoByIndex | getAddDevListInfoByIndex | -              |                 |                 | 获取设备申请信息(By_Device_In) |
| Device | addDeviceTest            | addDeviceTest            | -              | doAddDeviceTest |                 | 添加测试设备                   |
| Device | addDevice                | -                        | addDevice      | -               | doAddDevice     | 添加设备                       |
| Device | addDeviceApprove         | addDeviceApprove         | -              | -               | -               | 添加设备批准                   |
| Device | addDeviceReply           | -                        | addDeviceReply | -               | listenAddDevice | 添加设备批准回复               |
| Device | -                        | -                        | -              | listenAddDevice | -               | 监听添加设备相关事件           |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

alt: Plan1/2 - Approve with(out) record

  Note over Devices: New Device wants to add in
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Add to Devices List
  ETH -->>Http Server: Reply(Approve)
  Http Server -->>Devices: Reply(Approve)
  deactivate Http Server
  Note over Devices: Save Auth Info
  ETH->>Web: Notice
  activate Web
  deactivate ETH
  Note over Web: Refresh UI

else:Plan3 - Need Wait
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
  
else: Plan4 - Reject

	Note over Devices: New Device wants to add in
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  ETH -->>Http Server: Reply(Reject)
  deactivate ETH
  Http Server -->>Devices: Reply(Reject)
  deactivate Http Server
  
end


```

## 记录种类类别

|    类别    |     Solidity函数     |     合约API-Web      | 合约API-Node | JS-API-Web | JS-API-Node |         简介         |
| :--------: | :------------------: | :------------------: | :----------: | :--------: | :---------: | :------------------: |
| EventClass | getEventsClassLength | getEventsClassLength |              |            |             | 获取敏感事件类型个数 |
| EventClass |  getEventsClassInfo  |  getEventsClassInfo  |              |            |             |   获取敏感事件信息   |
| EventClass | getEventsClassCount  | getEventsClassCount  |              |            |             |   获取敏感事件类别   |
| EventClass |   setEventTypePlan   |   setEventTypePlan   |              |            |             | 修改敏感事件应对方案 |
| EventClass |   setEventTypeName   |   setEventTypeName   |              |            |             | 修改敏感事件应对名称 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web获取全部记录类别信息
Web->>ETH:getEventsClassLength
activate ETH
ETH->>Web:EventsClassLength
deactivate ETH
loop: for i in num
	Web->>ETH:getEventsClassInfo
	activate ETH
	ETH->>Web:EventsClassInfo
	deactivate ETH
end

Note over ETH,Web: Web设置某个记录类别信息
alt
	Web->>ETH:setEventTypePlan
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH
else
	Web->>ETH:setEventTypeName
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH
end
```

## 添加事件类型

|    类别    |     Solidity函数      |      合约API-Web      | 合约API-Node | JS-API-Web | JS-API-Node |         简介         |
| :--------: | :-------------------: | :-------------------: | :----------: | :--------: | :---------: | :------------------: |
| EventClass | getAddEventsClassLen  | getAddEventsClassLen  |              |            |             | 获取敏感事件申请表长 |
| EventClass | getAddEventsClassInfo | getAddEventsClassInfo |              |            |             | 获取敏感事件申请信息 |
| EventClass |  addEventsClassTest   |  addEventsClassTest   |              |            |             |   添加测试事件类型   |
| EventClass |    addEventsClass     |    addEventsClass     |              |            |             |   添加事件类型申请   |
| EventClass | addEventsClassApprove | addEventsClassApprove |              |            |             |   添加事件类型审批   |
| EventClass |  addEventsClassReply  |  addEventsClassReply  |              |            |             |   添加事件类型回复   |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

alt: Plan1/2 - Approve with(out) record

  Note over Devices: Device wants to add New Event Type
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Device wants to add New Event Type
  ETH -->>Http Server: Reply
  Http Server -->>Devices: Reply
  deactivate Http Server
  Note over Devices: Save Auth Info
  ETH->>Web: Notice
  activate Web
  deactivate ETH
  Note over Web: Refresh UI

else:Plan3 - Need Wait
  Note over Devices: Device wants to add New Event Type
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Add to Add Event Type Request Queue
  ETH -->>Http Server: (ACK)
  deactivate Http Server
  ETH->>Web: Notice
  activate Web
  deactivate ETH
  Note over Web: Wait for user
  Web->>ETH: Approve/Deny
  activate ETH
  Note over ETH: Change Add Event Type Request Queue Info
  ETH -->>Web: (ACK)
  deactivate Web
  ETH->>Http Server: Approve/Deny
  activate Http Server
  Http Server -->>ETH: (ACK)
  deactivate ETH
  Http Server->>Devices: Approve/Deny
  Http Server->>ETH: Result Notice
  activate ETH
  Note over ETH: Clear Add Event Type Request Queue
  Note over ETH: Add to Event Type Queue
  ETH -->>Http Server: (ACK)
  deactivate Http Server
  ETH->>Web: Notice
  Note over Web: Refresh UI
  deactivate ETH
  
else: Plan4 - Reject

	Note over Devices: Device wants to add New Event Type
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  ETH -->>Http Server: Reply(Reject)
  deactivate ETH
  Http Server -->>Devices: Reply(Reject)
  deactivate Http Server
  
end

```



## 添加测试事件类型

|    类别    | Solidity函数 | 合约API-Web  | 合约API-Node | JS-API-Web | JS-API-Node |       简介       |
| :--------: | :----------: | :----------: | :----------: | :--------: | :---------: | :--------------: |
| EventClass | addEventType | addEventType |              |            |             | 添加敏感事件类型 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web添加测试事件类型

	Web->>ETH:AddEventType
	activate ETH
	ETH-->>Web:ACK
	deactivate ETH

Note over Web: UI refresh
```

## 敏感事件

| 类别  |  Solidity函数  |  合约API-Web   | 合约API-Node | JS-API-Web | JS-API-Node |        简介        |
| :---: | :------------: | :------------: | :----------: | :--------: | :---------: | :----------------: |
| Event | getEventLength | getEventLength |              |            |             |  获取事件长度函数  |
| Event |    getEvent    |    getEvent    |              |            |             | 获取事件的测试函数 |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

Note over ETH,Web: Web获取全部记录信息
Web->>ETH:getEventLength
activate ETH
ETH->>Web:EventLength
deactivate ETH
loop: for i in num
	Web->>ETH:getEvent
	activate ETH
	ETH->>Web:EventInfo
	deactivate ETH
end
```

## 代办清单

|   类别   |   Solidity函数    |    合约API-Web    | 合约API-Node | JS-API-Web | JS-API-Node |       简介       |
| :------: | :---------------: | :---------------: | :----------: | :--------: | :---------: | :--------------: |
| ToDoList | getToDoListLength | getToDoListLength |              |            |             | 获取待办清单长度 |
| ToDoList |  getToDoListInfo  |  getToDoListInfo  |              |            |             | 获取待办清单信息 |
| ToDoList |     addEvent      |     addEvent      |              |            |             |   敏感事件申请   |
| ToDoList |    toDoListDo     |    toDoListDo     |              |            |             |    同意/拒绝     |

```mermaid
sequenceDiagram
participant Web
participant ETH
participant Http Server
participant Devices

alt: Plan1/2 - Approve with(out) record

  Note over Devices: Device wants to add New Event
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Add to ToDoList
  ETH -->>Http Server: Reply
  Http Server -->>Devices: Reply
  deactivate Http Server
  Note over Devices: Save Auth Info
  ETH->>Web: Notice
  activate Web
  deactivate ETH
  Note over Web: Refresh UI

else:Plan3 - Need Wait
  Note over Devices: Device wants to add New Event
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Add to ToDoList
  ETH -->>Http Server: (ACK)
  deactivate Http Server
  ETH->>Web: Notice
  activate Web
  deactivate ETH
  Note over Web: Wait for user
  Web->>ETH: Approve/Deny
  activate ETH
  Note over ETH: Change ToDoList Info
  ETH -->>Web: (ACK)
  deactivate Web
  ETH->>Http Server: Approve/Deny
  activate Http Server
  Http Server -->>ETH: (ACK)
  deactivate ETH
  Http Server->>Devices: Approve/Deny
  Http Server->>ETH: Result Notice
  activate ETH
  Note over ETH: Clear ToDoList
  Note over ETH: Add to Event List
  ETH -->>Http Server: (ACK)
  deactivate Http Server
  ETH->>Web: Notice
  Note over Web: Refresh UI
  deactivate ETH
  
else: Plan4 - Reject

	Note over Devices: Device wants to add New Event
  Devices->>Http Server: Add Request
  activate Http Server
  Http Server->>ETH: Add Request
  activate ETH
  Note over ETH: Add to Event List
  ETH -->>Http Server: Reply(Reject)
  deactivate ETH
  Http Server -->>Devices: Reply(Reject)
  deactivate Http Server
  
end


```

