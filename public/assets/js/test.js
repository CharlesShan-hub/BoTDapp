
async function test(){
	// 测试获取账户0 - pass
	//console.log("accounts[0]:",await getAccount0(),"\n\n");

	// 解锁账户0 - pass
	//console.log("unlock accounts[0]:", await unlockAccount0(),"\n\n");

	// 添加账户 - pass
	//console.log("Add accounts",await addAccount(),"\n\n");

	// 身份认证与修改密码 - pass
	//console.log("Auth by '':",await auth(""),"\n\n");
	//console.log("Auth by '123':",await auth("123"),"\n\n");
	//console.log("Reset Auth Password '1'->'1'(wrong) '':",await setPassword("1","1"),"\n\n");
	//console.log("Reset Auth Password ''->'1'(true) '':",await setPassword("","1"),"\n\n");
	//console.log("Reset Auth Password '1'->''(true) '':",await setPassword("1",""),"\n\n");
	
	// 获取设备数量 - pass
	//console.log("Get Devices Length",await getDeviceLength(),"\n\n");

	// 添加设备 - pass
	//var info = await addAccount();
	//if(info!=false){
	//	console.log("Add Device",await addDevice(info["account"],info["password"],"Cat","miao miao miao"),"\n\n");
	//}

	// 设置设备名称 - pass
	//console.log("Set Device Name",await setDeviceName(0,"Dog"),"\n\n");

	// 获取设备信息 - pass
	//console.log("Get Device[0] Info",await getDeviceInfo(0),"\n\n");
	//console.log("Get Device[1] Info",await getDeviceInfo(1),"\n\n");

	// 设置设备信息 - pass
	//console.log("Set Device[0] Info",await setDeviceInfo(0,"Butterfly","Fly Fly"),"\n\n");

	// 删除设备 - pass
	//console.log("Delete a Device:",await reduceDevice(1),"\n\n");
	//console.log("Delete a wrong Device;",await reduceDevice(100),"\n\n");

	// 设备认证 - pass
	//console.log("",await authDevice("0xB008A3c64d0D1Cfd3763Fc6901A4f4d0C8b1B425","88279013",0),"\n\n");

	// 获取事件类型长度 - pass
	//console.log("Get EventType Number",await getEventsClassLength(),"\n\n");

	// 获取事件类型信息 - pass
	//console.log("",await getEventsClassInfo(0),"\n\n");
	//console.log("",await getEventsClassInfo(1),"\n\n");
	//console.log("",await getEventsClassInfo(2),"\n\n");
	//console.log("",await getEventsClassInfo(3),"\n\n");

	// 修改敏感事件应对方案&名称 - pass
	//console.log("Origin EventType:",await getEventsClassInfo(1),"\n\n");
	//console.log("Change EventTypePlan",await setEventTypePlan(1,3),"\n\n");
	//console.log("Change EventTypeName",await setEventTypeName(1,"Name"),"\n\n");
	//console.log("Finally Info",await getEventsClassInfo(1),"\n\n");

	// 代办清单长度 - pass
	//console.log("To Do List Length:",await getToDoListLength(),"\n\n");

	// 添加敏感事件 - pass
	//console.log("To Do List Length:",await getToDoListLength(),"\n\n");
	//var info = await addAccount();
	//if(info!=false){
	//	console.log("Add Device",await addDevice(info["account"],info["password"],"Cat","miao miao miao"),"\n\n");
	//}
	//console.log("Add New Event:",await setEvent(info["account"],info["password"],0,2),"\n\n");
	//console.log("To Do List Length:",await getToDoListLength(),"\n\n");


	// 代办清单内容 - pass
	//console.log("To Do List Info:",await getToDoListInfo(0),"\n\n");
	//console.log("To Do List Info:",await getToDoListInfo(1),"\n\n");

	// 处理代办清单内容 - pass
	//console.log("To Do List Length:",await getToDoListLength(),"\n\n");
	//var info = await addAccount();
	//if(info!=false){
	//	console.log("Add Device",await addDevice(info["account"],info["password"],"Cat","miao miao miao"),"\n\n");
	//}
	//console.log("Add New Event:",await setEvent(info["account"],info["password"],0,2),"\n\n");
	//console.log("Do To Do List:",await toDoListDo(0,true),"\n\n");
	//console.log("To Do List Length:",await getToDoListLength(),"\n\n");
}

async function test2(){
	var a = [1,2,3,4];
	var num = 10;
	var color = new Array();
	for(var i=0;i<parseInt(num/a.length);i++){
		color=color.concat(a);
	}
	for(var i=0;i<parseInt(num%a.length);i++){
		color=color.concat(a[i]);
	}
	console.log(color);


}