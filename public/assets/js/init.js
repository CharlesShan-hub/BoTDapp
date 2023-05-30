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
    /*BoT-FLAG-CON1*/
var CONTRACT = "0x822ab3910B96f3D2ea1414616dB46BfB3686728b";
    /*BoT-FLAG-CON2*/
    /*BoT-FLAG-ABI1*/
var abi = '[ {  "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         },      {           "internalType": "bool",             "name": "real",             "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "_addEvent",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "i",            "type": "uint8"         }   ],  "name": "_reduceAddEventsClass",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "string",           "name": "_password",            "type": "string"        },      {           "internalType": "string",           "name": "_name",            "type": "string"        },      {           "internalType": "string",           "name": "_detail",          "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addDevice",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "bool",             "name": "_approve",             "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addDeviceApprove",     "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [],   "stateMutability": "nonpayable",    "type": "constructor" }, {  "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "indexed": false,           "internalType": "bool",             "name": "wait",             "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddDevice",    "type": "event" }, {    "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "address",          "name": "account",          "type": "address"       },      {           "indexed": false,           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddDeviceApprove",     "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addDeviceReply",   "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "bool",             "name": "refresh",          "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddDeviceReply",   "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "string",           "name": "_password",            "type": "string"        },      {           "internalType": "string",           "name": "_name",            "type": "string"        },      {           "internalType": "string",           "name": "_detail",          "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addDeviceTest",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddDeviceTest",    "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "string",           "name": "_password",            "type": "string"        },      {           "internalType": "string",           "name": "eventClass",           "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEvent",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "indexed": false,           "internalType": "bool",             "name": "wait",             "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "eventId",          "type": "uint256"       },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEvent",     "type": "event" }, {    "inputs": [         {           "internalType": "uint8",            "name": "index",            "type": "uint8"         },      {           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventApprove",  "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventApprove",  "type": "event" }, {    "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventReply",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventReply",    "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "string",           "name": "_password",            "type": "string"        },      {           "internalType": "uint8",            "name": "_class",           "type": "uint8"         },      {           "internalType": "string",           "name": "_name",            "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventsClass",   "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "index",            "type": "uint8"         },      {           "internalType": "bool",             "name": "_approve",             "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventsClassApprove",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "indexed": false,           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         }   ],  "name": "AddEventTest",     "type": "event" }, {    "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "indexed": false,           "internalType": "bool",             "name": "wait",             "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventsClass",   "type": "event" }, {    "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint8",            "name": "index",            "type": "uint8"         },      {           "indexed": false,           "internalType": "bool",             "name": "approve",          "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventsClassApprove",    "type": "event" }, {    "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventsClassReply",  "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "bool",             "name": "refresh",          "type": "bool"      },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventsClassReply",  "type": "event" }, {    "inputs": [         {           "internalType": "uint8",            "name": "eventClass",           "type": "uint8"         },      {           "internalType": "string",           "name": "eventName",            "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventsClassTest",   "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint8",            "name": "eventsClassId",            "type": "uint8"         },      {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "AddEventsClassTest",   "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "addEventTest",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "nonpayable",    "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "reduceDevice",     "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "ReduceDevice",     "type": "event" }, {    "inputs": [         {           "internalType": "bool",             "name": "state",            "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setCameraServe",   "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetCameraServe",   "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "string",           "name": "_name",            "type": "string"        },      {           "internalType": "string",           "name": "_detail",          "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setDeviceInfo",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetDeviceInfo",    "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "string",           "name": "_name",            "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setDeviceName",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetDeviceName",    "type": "event" }, {    "inputs": [         {           "internalType": "string",           "name": "_email",           "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setEmail",     "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       },      {           "indexed": false,           "internalType": "string",           "name": "email",            "type": "string"        }   ],  "name": "SetEmail",     "type": "event" }, {    "inputs": [         {           "internalType": "bool",             "name": "state",            "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setEmailServe",    "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetEmailServe",    "type": "event" }, {    "inputs": [         {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         },      {           "internalType": "bool",             "name": "camera",           "type": "bool"      },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setEventTypeCamera",   "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetEventTypeCamera",   "type": "event" }, {    "inputs": [         {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         },      {           "internalType": "string",           "name": "eventName",            "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setEventTypeName",     "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetEventTypeName",     "type": "event" }, {    "inputs": [         {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         },      {           "internalType": "uint8",            "name": "planId",           "type": "uint8"         },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setEventTypePlan",     "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetEventTypePlan",     "type": "event" }, {    "inputs": [         {           "internalType": "string",           "name": "oldPassword",          "type": "string"        },      {           "internalType": "string",           "name": "newPassword",          "type": "string"        },      {           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "setPassword",  "outputs": [],  "stateMutability": "nonpayable",    "type": "function" }, {     "anonymous": false,     "inputs": [         {           "indexed": false,           "internalType": "uint256",          "name": "identity",             "type": "uint256"       }   ],  "name": "SetPassword",  "type": "event" }, {    "inputs": [         {           "internalType": "address",          "name": "",             "type": "address"       }   ],  "name": "addDeviceAccountToIndex",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "addDeviceIndexToAccount",  "outputs": [        {           "internalType": "address",          "name": "",             "type": "address"       }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "addDeviceList",    "outputs": [        {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "string",           "name": "detail",           "type": "string"        },      {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "string",           "name": "password",             "type": "string"        },      {           "internalType": "bool",             "name": "read",             "type": "bool"      },      {           "internalType": "bool",             "name": "approve",          "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "addDeviceListLen",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       }   ],  "name": "addDeviceState",   "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "addEventsClassIndexToName",    "outputs": [        {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "addEventsClassLen",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "addEventsClassList",   "outputs": [        {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "uint8",            "name": "class",            "type": "uint8"         },      {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "bool",             "name": "read",             "type": "bool"      },      {           "internalType": "bool",             "name": "approve",          "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "name": "addEventsClassNameToIndex",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "addEventsClassState",  "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "addEventState",    "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "_password",            "type": "string"        }   ],  "name": "auth",     "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       }   ],  "name": "authAddDevice",    "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "authAddEvent",     "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "authAddEventsClass",   "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "_account",             "type": "address"       },      {           "internalType": "string",           "name": "_password",            "type": "string"        }   ],  "name": "authDevice",   "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "authEventsClass",  "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "_str1",            "type": "string"        },      {           "internalType": "string",           "name": "_str2",            "type": "string"        }   ],  "name": "compareStr",   "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "pure",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "",             "type": "address"       }   ],  "name": "deviceAccountToIndex",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "deviceIndexToAccount",     "outputs": [        {           "internalType": "address",          "name": "",             "type": "address"       }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "devices",  "outputs": [        {           "internalType": "address",          "name": "account",          "type": "address"       },      {           "internalType": "string",           "name": "password",             "type": "string"        },      {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "string",           "name": "detail",           "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "devicesNum",   "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "eventsById",   "outputs": [        {           "internalType": "uint8",            "name": "class",            "type": "uint8"         },      {           "internalType": "uint256",          "name": "time",             "type": "uint256"       },      {           "internalType": "bool",             "name": "state1",           "type": "bool"      },      {           "internalType": "bool",             "name": "state2",           "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "eventsClass",  "outputs": [        {           "internalType": "uint8",            "name": "class",            "type": "uint8"         },      {           "internalType": "uint8",            "name": "count",            "type": "uint8"         },      {           "internalType": "string",           "name": "name",             "type": "string"        },      {           "internalType": "bool",             "name": "camera",           "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "name": "eventsClassNameToIndex",   "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "eventsClassNum",   "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "",             "type": "address"       }   ],  "name": "eventsNum",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       }   ],  "name": "getAddDevListInfo",    "outputs": [        {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "index",            "type": "uint8"         }   ],  "name": "getAddDevListInfoByIndex",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getAddDevListLen",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "index",            "type": "uint8"         }   ],  "name": "getAddEventsClassInfo",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "getAddEventsClassInfoByName",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getAddEventsClassLen",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getCameraServe",   "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "address",          "name": "account",          "type": "address"       }   ],  "name": "getDeviceInfo",    "outputs": [        {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "index",            "type": "uint8"         }   ],  "name": "getDeviceInfoByIndex",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getDeviceNum",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getEmail",     "outputs": [        {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getEmailServe",    "outputs": [        {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "deviceId",             "type": "uint8"         },      {           "internalType": "uint8",            "name": "eventId",          "type": "uint8"         }   ],  "name": "getEvent",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "uint256",          "name": "",             "type": "uint256"       },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "deviceId",             "type": "uint8"         }   ],  "name": "getEventLength",   "outputs": [        {           "internalType": "uint256",          "name": "",             "type": "uint256"       }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "id",           "type": "uint8"         }   ],  "name": "getEventsClassCount",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "getEventsClassIndex",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "id",           "type": "uint8"         }   ],  "name": "getEventsClassInfo",   "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "name",             "type": "string"        }   ],  "name": "getEventsClassInfoByName",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "string",           "name": "",             "type": "string"        },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getEventsClassLength",     "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "i",            "type": "uint8"         }   ],  "name": "getToDoListInfo",  "outputs": [        {           "internalType": "address",          "name": "",             "type": "address"       },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "uint8",            "name": "",             "type": "uint8"         },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      },      {           "internalType": "bool",             "name": "",             "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "getToDoListLength",    "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "name": "toDoList",     "outputs": [        {           "internalType": "bool",             "name": "real",             "type": "bool"      },      {           "internalType": "address",          "name": "device",           "type": "address"       },      {           "internalType": "uint8",            "name": "eventType",            "type": "uint8"         },      {           "internalType": "uint8",            "name": "refer",            "type": "uint8"         },      {           "internalType": "bool",             "name": "read",             "type": "bool"      },      {           "internalType": "bool",             "name": "approve",          "type": "bool"      }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [],   "name": "toDoListLen",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" }, {     "inputs": [         {           "internalType": "string",           "name": "",             "type": "string"        }   ],  "name": "toDoListNameToIndex",  "outputs": [        {           "internalType": "uint8",            "name": "",             "type": "uint8"         }   ],  "stateMutability": "view",  "type": "function" } ]';
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
 * 获取邮箱                    getEmail()
 * 设置邮箱                    setEmail(email)
 * 获取邮箱服务                 getEmailServe()
 * 设置邮箱服务                 setEmailServe(emailServe)
 * 获取摄像头服务               getCameraServe
 * 设置摄像头服务               setCameraServe(cameraServe)
 * 
 * 设备-------------------------------------------------------------------
 * 
 * 设备数量                    getDeviceNum()
 * 获取设备信息                 getDeviceInfo(account)
 * 获取设备信息                 getDeviceInfoByIndex(index)
 * 设置设备名称                 setDeviceName(account,name)
 * 设置设备信息                 setDeviceInfo(account,name,detail)
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
 * 修改敏感事件是否开启摄像头     setEventTypeCamera(eventId,newCamera)
 * 添加事件类型                addEventType(eventClass,eventName)
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

// 工具函数

/**
 * 设置监听器
 */
async function setListener(identity,eventName){
    new Promise(function(result,error){
        contract.once(eventName, {}, function(error, event){ 
            if(event["returnValues"]["identity"]==identity)eval("FLAG"+eventName+" = "+identity);
        });
    });
}

/**
 * 获取监听器信息
 */
function getListenerRes(identity,eventName){
    while(eval("FLAG"+eventName+" != "+identity));
    var temp;eval("temp = FLAG"+eventName);
    eval("FLAG"+eventName+" = undefined");
    return temp==identity;
}

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
    /*
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
    });*/
}

/**
 * 添加账户
 */
function addAccount(){
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    var _account = "0x"+genRanHex(40);
    var _password = randomNum(10000000,99999999).toString();
    return {"account":_account,"password":_password};
    /*
    return new Promise(function(result){
        web3.eth.personal.newAccount(_password).then(function(value) {
            _account = value;
            console.log("Generate New User:",_account,_password);
            result({"account":_account,"password":_password});
        }, function(reason) {
            console.log(reason);
            result(false);
        });
    });*/
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
 * 控制面板修改密码
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
FLAGSetPassword=undefined;
async function setPassword(oldPassword,newPassword){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetPassword');
    if(await _setPassword(oldPassword,newPassword,identity)==false) return false;
    return getListenerRes(identity,'SetPassword');
}

/**
 * 获取邮箱
 */
async function getEmail(){
    return new Promise(function(result){
        try{
            contract.methods.getEmail().call(function(error, res){
                if(error){
                    console.log("Error: Fail to get email(C)");
                    result(false);
                }else{
                    console.log("Get Email: ",res);
                    result(res);
                }
            });
        }catch{
            console.log("Error: Fail to get email!");
            result(false);
        }
    });
}

/**
 * 修改邮箱
 */
async function _setEmail(email,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEmail(email,identity).send({from:account})
        .then(function(res){
            console.log("Change Email Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Change Email failed!",reason);
            result(false);
        });
    });
}
FLAGSetEmail=undefined;
async function setEmail(email){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetEmail');
    if(await _setEmail(email,identity)==false) return false;
    return getListenerRes(identity,'SetEmail');
}


/**
 * 获取邮箱服务
 */
async function getEmailServe(){
    return new Promise(function(result){
        try{
            contract.methods.getEmailServe().call(function(error, res){
                if(error){
                    console.log("Error: Fail to get emailServe(C)");
                    result(false);
                }else{
                    console.log("Get EmailServe: ",res);
                    result(res);
                }
            });
        }catch{
            console.log("Error: Fail to get emailServe!");
            result(false);
        }
    });
}


/**
 * 修改邮箱服务
 */
async function _setEmailServe(email,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEmailServe(email,identity).send({from:account})
        .then(function(res){
            console.log("Change Email Serve Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Change Email Serve failed!",reason);
            result(false);
        });
    });
}
FLAGSetEmailServe=undefined;
async function setEmailServe(email){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetEmailServe');
    if(await _setEmailServe(email,identity)==false) return false;
    return getListenerRes(identity,'SetEmailServe');
}

/**
 * 获取摄像头服务
 */
async function getCameraServe(){
    return new Promise(function(result){
        try{
            contract.methods.getCameraServe().call(function(error, res){
                if(error){
                    console.log("Error: Fail to get cameraServe(C)");
                    result(false);
                }else{
                    console.log("Get Camera Serve: ",res);
                    result(res);
                }
            });
        }catch{
            console.log("Error: Fail to get cameraServe!");
            result(false);
        }
    });
}


/**
 * 修改摄像头服务
 */
async function _setCameraServe(camera,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setCameraServe(camera,identity).send({from:account})
        .then(function(res){
            console.log("Change Camera Serve Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Change Camera Serve failed!",reason);
            result(false);
        });
    });
}
FLAGSetCameraServe=undefined;
async function setCameraServe(camera){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetCameraServe');
    if(await _setCameraServe(camera,identity)==false) return false;
    return getListenerRes(identity,'SetCameraServe');
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
 * 获取设备信息
 */
function getDeviceInfo(account){
    return new Promise(function(result){
        contract.methods.getDeviceInfo(account).call(function(error, res){
            if(error){
                console.log("Get Device Info Error: ", account, error);
                result(false);
            }else{
                console.log("Get Device Info: ",res);
                result({'0':res[0],'1':res[1],'name':res[0],'detail':res[1]});
            }
        });
    });
}
function getDeviceInfoByIndex(index){
    return new Promise(function(result){
        contract.methods.getDeviceInfoByIndex(index).call(function(error, res){
            if(error){
                console.log("Get Device Info Error: ",index,error);
                result(false);
            }else{
                console.log("Get Device Info: ",res);
                result({
                    '0':res[0],'1':res[1],'2':res[2],'3':res[3],
                    'index':res[0],'account':res[1],'name':res[2],'detail':res[3]
                });
            }
        });
    });
}

/**
 * 设置设备名称
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
FLAGSetDeviceName = undefined;
async function setDeviceName(_account,name){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetDeviceName');
    if(await _setDeviceName(_account,name,identity)==false) return false;
    return getListenerRes(identity,'SetDeviceName');
}

/**
 * 设置设备信息
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
FLAGSetDeviceInfo = false;
async function setDeviceInfo(_account,name,detail){
    var identity = randomNum(100000,999999);                                    // 设置随机数
    setListener(identity,'SetDeviceInfo');                                      // 设置监听器(监听以太坊)
    if(await _setDeviceInfo(_account,name,detail,identity)==false) return false;// 向以太坊申请修改信息
    return getListenerRes(identity,'SetDeviceInfo');                            // 监听器收到以太坊结果
}

/**
 * 删除设备
 */
async function _reduceDevice(_account,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.reduceDevice(_account,identity).send({from:account})
        .then(function(res){
            console.log("Deleted Device Request Send",res);
            result(true);
        }, function(error) {
            console.log("Reduce Device Failed!",error);
            result(false);
        });
    });
}
FLAGReduceDevice=undefined;
async function reduceDevice(_account){
    var identity = randomNum(100000,999999);
    setListener(identity,'ReduceDevice');
    if(await _reduceDevice(_account,identity)==false) return false;
    return getListenerRes(identity,'ReduceDevice');
}

/**
 * 设备认证
 */
async function authDevice(_account,password){
    return new Promise(function(result){
        contract.methods.authDevice(_account,password).call(function(error, res){
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
function getAddDevListInfo(address){
    return new Promise(function(result){
        contract.methods.getAddDevListInfo(address).call(function(error, res){
            if(error){
                console.log("Get Device Add Request Info Error: ",error);
                result(false);
            }else{
                console.log("Get Device Add Request Info: ",res);
                result({
                    'name':res[0],
                    'detail':res[1],
                    'account':res[2],
                    'password':res[3],
                    'approve':res[4],
                    'read':res[5]
                });
            }
        });
    });
}
function getAddDevListInfoByIndex(requestId){
    return new Promise(function(result){
        contract.methods.getAddDevListInfoByIndex(requestId).call(function(error, res){
            if(error){
                console.log("Get Device Add Request Info Error: ",error);
                result(false);
            }else{
                console.log("Get Device Add Request Info: ",res);
                result({
                    'index':res[0],
                    'name':res[1],
                    'detail':res[2],
                    'account':res[3],
                    'password':res[4],
                    'approve':res[5],
                    'read':res[6]
                });
            }
        });
    });
}

/**
 * 添加测试设备
 */
async function _addDeviceTest(_account,password,name,detail,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addDeviceTest(_account,password,name,detail,identity).send({from:account})
        .then(function(res){
            console.log("Add Test Device Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Test Device failed!",reason);
            result(false);
        });
    });
}
FLAGAddDeviceTest=undefined;
async function addDeviceTest(_account,password,name,detail){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddDeviceTest');
    if(await _addDeviceTest(_account,password,name,detail,identity)==false) return false;
    return getListenerRes(identity,'AddDeviceTest');
}

/**
 * 添加设备批准
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
FLAGAddDeviceApprove=undefined;
async function addDeviceApprove(account,approve){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddDeviceApprove');
    if(await _addDeviceApprove(account,approve,identity)==false) return false;
    return getListenerRes(identity,'AddDeviceApprove');
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
                result(parseInt(number));
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
                result({
                    '0':res[0],'1':res[1],'2':res[2],'3':res[3],
                    'id':res[0],'class':res[1],'name':res[2],'camera':res[3]
                });
            }
        });
    });
}

/**
 * 获取敏感事件类别数量
 */
async function getEventsClassCount(eventTypeId){
    return new Promise(function(result){
        contract.methods.getEventsClassCount(eventTypeId).call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Num: ",parseInt(number));
                result(parseInt(number));
            }
        });
    });
}

/**
 * 修改敏感事件应对方案
 */
async function _setEventTypePlan(eventId,newClass,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEventTypePlan(eventId,newClass,identity).send({from:account})
        .then(function(res){
            console.log("EventType Class Change Request Send",res);
            result(true)
        }, function(error) {
            console.log("EventType Class Change Failed!",error);
            result(false);
        });
    });
}
FLAGSetEventTypePlan=undefined;
async function setEventTypePlan(eventId,newClass){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetEventTypePlan');
    if(await _setEventTypePlan(eventId,newClass,identity)==false) return false;
    return getListenerRes(identity,'SetEventTypePlan');
}

/**
 * 修改敏感事件名称
 */
async function _setEventTypeName(eventId,newName,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEventTypeName(eventId,newName,identity).send({from:account})
        .then(function(res){
            console.log("EventType Name Change Request Send",res);
            result(true);
        }, function(error) {
            console.log("EventType Name Change Failed!",error);
            result(false);
        });
    });
}
FLAGSetEventTypeName=undefined;
async function setEventTypeName(eventId,newName){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetEventTypeName');
    if(await _setEventTypeName(eventId,newName,identity)==false) return false;
    return getListenerRes(identity,'SetEventTypeName');
}

/**
 * 修改敏感事件是否开启摄像头
 */
async function _setEventTypeCamera(eventId,newCamera,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.setEventTypeCamera(eventId,newCamera,identity).send({from:account})
        .then(function(res){
            console.log("EventType Camera Config Change Request Send",res);
            result(true)
        }, function(error) {
            console.log("EventType Camera Config Change Failed!",error);
            result(false);
        });
    });
}
FLAGSetEventTypeCamera=undefined;
async function setEventTypeCamera(eventId,newCamera){
    var identity = randomNum(100000,999999);
    setListener(identity,'SetEventTypeCamera');
    if(await _setEventTypeCamera(eventId,newCamera,identity)==false) return false;
    return getListenerRes(identity,'SetEventTypeCamera');
}

/**
 * 添加事件类型列表长度
 */
function getEventsClassIndex(name){
    return new Promise(function(result){
        contract.methods.getEventsClassIndex(name).call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Event Type Index: ",number);
                result(parseInt(number));
            }
        });
    });
}

/**
 * 添加事件类型列表长度
 */
function getAddEventsClassLen(){
    return new Promise(function(result){
        contract.methods.getAddEventsClassLen().call(function(error, number){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Add Event Type List Number: ",number);
                result(parseInt(number));
            }
        });
    });
}

/**
 * 添加事件类型列表信息
 */
function getAddEventsClassInfo(num){
    return new Promise(function(result){
        contract.methods.getAddEventsClassInfo(num).call(function(error, info){
            if(error){
                console.log("Error: ",error);
                result(false);
            }else{
                console.log("Add Event Type List Number: ",info);
                result({
                    '0':info[0],'1':info[1],'2':info[2],'3':info[3],'4':info[4],
                    'index':info[0],'account':info[1],'class':info[2],'name':info[3],'approve':info[4]
                });
            }
        });
    });
}

/**
 * 添加测试事件类型
 */
async function _addEventsClassTest(eventClass,eventName,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventsClassTest(eventClass,eventName,identity).send({from:account})
        .then(function(res){
            console.log("Add EventType Request Send",res);
            result(true);
        }, function(error) {
            console.log("Add EventType Failed!",error);
            result(false);
        });
    });
}
FLAGAddEventsClassTest=undefined;
async function addEventsClassTest(eventClass,eventName){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddEventsClassTest');
    if(await _addEventsClassTest(eventClass,eventName,identity)==false) return false;
    return getListenerRes(identity,'AddEventsClassTest');
}

/**
 * 添加事件类型批准
 */
async function _addEventsClassApprove(index,approve,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventsClassApprove(index,approve,identity).send({from:account})
        .then(function(res){
            console.log("Add Event Type Approve Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Event Type Approve failed!",reason);
            result(false);
        });
    });
}
FLAGAddEventsClassApprove=undefined;
async function addEventsClassApprove(index,approve){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddEventsClassApprove');
    if(await _addEventsClassApprove(index,approve,identity)==false) return false;
    return getListenerRes(identity,'AddEventsClassApprove');
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
                result(parseInt(number));
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
                result({
                    '0':res[0],'1':res[1],'2':res[2],'3':res[3],
                    'class':res[0],'time':res[1],'state1':res[2],'state2':res[3]
                });
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
                result(parseInt(number));
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
                result({
                    '0':res[0],'1':res[1],'2':res[2],'3':res[3],'4':res[4],'5':res[5],'6':res[6],
                    'account':res[0],'eventType':res[1],'refer':res[2],'id':res[3],'read':res[4],'approve':res[5],'real':res[6]
                });
            }
        });
    });
}

/**
 * 敏感测试事件申请
 */
async function _addEventTest(_account,eventId,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventTest(_account,eventId,identity).send({from:account})
        .then(function(res){
            console.log("Add Event Request Send",res);
            result(true);
        }, function(error) {
            console.log("Add Event Failed!",error);
            result(false);
        });
    });
}
//FLAGAddEvent=undefined;
async function addEventTest(_account,eventId){
    let FLAGAddEvent="";
    var identity = randomNum(100000,999999);
    setListener(identity,'AddEvent');
    //if(await _addEventTest(_account,eventId,identity)==false) return false;
    _addEventTest(_account,eventId,identity);
    return new Promise(function(result,error){
        contract.once("AddEvent", {}, function(error, event){ 
            FLAGAddEvent = event["returnValues"];
            result({'approve':FLAGAddEvent["approve"],'wait':FLAGAddEvent["wait"]});
            //console.log("aaaaaa1.5,",FLAGAddEvent);
            //FLAGAddEvent=event["returnValues"];
            //console.log("aaaaaa1.5,",FLAGAddEvent["identity"]);
        });
    });

    //console.log("aaaaaaaaaaaaa1",identity,FLAGAddEvent["identity"]);
    //while(FLAGAddEvent["identity"]!=identity){console.log(FLAGAddEvent["identity"])}
    //console.log("aaaaaaaaaaaaa2");
	//return {'approve':FLAGAddEvent["approve"],'wait':FLAGAddEvent["wait"]};
}


/**
 * 清单信息同意/拒绝
 */
async function _addEventApprove(index,approve,identity){
    var account = await getAccount0();
    return new Promise(function(result){
        if(account==false){
            console.log("getAccount0 failed ",identity);
            result(false);
        }
        contract.methods.addEventApprove(index,approve,identity).send({from:account})
        .then(function(res){
            console.log("To do list reply Request Send",res);
            result(true);
        }, function(error) {
            console.log("To do list reply Failed!",error);
            result(false);
        });
    });
}
FLAGAddEventApprove=undefined;
async function addEventApprove(index,approve){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddEventApprove');
    if(await _addEventApprove(index,approve,identity)==false) return false;
    return getListenerRes(identity,'AddEventApprove');
}

/**
 * 添加事件批准回复(针对于模拟申请批准或拒绝后，清空待办清单)
 */
async function _addEventReply(name,identity) {
    var account_ = await getAccount0();
    return new Promise(function(result){
        if(account_==false){
            result(false);
        }
        contract.methods.addEventReply(name,identity).send({from:account_})
        .then(function(res){
            console.log("Add Event Reply Request Send ",identity);
            result(true);
        }, function(reason) {
            console.log("Add Event Reply failed!",reason);
            result(false);
        });
    });
}
FLAGAddEventReply=undefined;
async function addEventReply(name){
    var identity = randomNum(100000,999999);
    setListener(identity,'AddEventReply');
    if(await _addEventReply(name,identity)==false) return false;
    return getListenerRes(identity,'AddEventReply');
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

/**
 * 提示窗口
 */
function sweetAlert(type,word){
    if(type==1){
        Swal.fire({
            title:word,
            //text:"You clicked the button!",
            type:"success",
            showCancelButton:0,
            confirmButtonColor:"#556ee6"
            //cancelButtonColor:"#f46a6a"
        })
    }else if(type==2){
        Swal.fire({
            title:word,
            //text:"You won't be able to revert this!",
            type:"warning",
            showCancelButton:0,
            confirmButtonColor:"#34c38f"
        })
    }
}

/** 
 * 时间戳转时间字符串
 */
function getTime(timestamp){
    let date = new Date(parseInt(timestamp) * 1000);
    let Year = date.getFullYear();
    let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let  GMT =  Year + '-' + Moth + '-' + Day + '   '+ Hour +':'+ Minute  + ':' + Sechond;
    return GMT;
}

/**
 * 获取当前时间
 */
function getNowTime(){
    var timestamp = Date.parse(new Date());
    let date = new Date(parseInt(timestamp));
    let Year = date.getFullYear();
    let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let  GMT =  Year + '-' + Moth + '-' + Day + '_'+ Hour +'-'+ Minute  + '-' + Sechond;
    return GMT;
}
function getNowTime2(){
    var timestamp = Date.parse(new Date());
    let date = new Date(parseInt(timestamp));
    let Year = date.getFullYear();
    let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let  GMT =  Year + '-' + Moth + '-' + Day + '\n'+ Hour +':'+ Minute  + ':' + Sechond;
    return GMT;
}

