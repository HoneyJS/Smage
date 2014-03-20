/***
 * PhoneGap按键设置
 */
(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
	// PhoneGap加载完毕
	function onDeviceReady() {
		alert("onDeviceReady");
		//按钮事件
		//checkConnection();
		document.addEventListener("backbutton", eventBackButton, false); //返回键
		document.addEventListener("menubutton", eventMenuButton, false); //菜单键
		document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
	}
	function onQuitConfirm(buttonIndex) {
		if (buttonIndex == '2') {
			navigator.app.exitApp();
		}
	}
	//返回键
	function eventBackButton() {
		navigator.notification.confirm('确定要从Smage中退出？', // 显示信息
			onQuitConfirm, // 按下按钮后触发的回调函数，返回按下按钮的索引
			'退出应用', // 标题
			['取消', '确定'] // 按钮标签
		);
	}
	//菜单键
	function eventMenuButton() {
		//alert('点击了 菜单 按钮!');
	}

	//搜索键
	function eventSearchButton() {
		//window.plugins.ToastPlugin.show_short('点击了 搜索 按钮!');
	}

	function checkConnection() {
		var networkState = navigator.network.connection.type;
		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.NONE]     = 'No network connection';
		//alert(states[networkState]);
		if (states[networkState]=='No network connection'||typeof states[networkState] == "undefined") {
			/*Ext.Msg.alert('警告', '应用需要连接网络获得数据，请打开网络.', function(){
				navigator.device.exitApp();
			});*/
		}
	};
})();
