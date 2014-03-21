/**
 * 预定义式样列表
 */
(function(){
	
var Styles = Honey.Styles;

Styles.FruitHit = {
	Info : {
		color:"#af3",
		fontSize:30,
		shadow:1,
	},
	Cell : {
		width:Smage.FruitHit.Config.CellWidth-10,
		height:Smage.FruitHit.Config.CellHeight-10,
		//borderColor:"gray",
		//borderWidth:2,
		ElementAttach:{
			paddingWidth:5,
		},
	},
	Center : {
		width:480,
		height:800,
	},
	Score : {
		fontSize:100,
		color:"#0f0",
		fontWidth:5,
		shadow:1,
	},
	Time : {
		fontSize:100,
		color:"#0f0",
		fontWidth:5,
		shadow:1,
	},
	TimerBar : {
		width:440,
		height:20,
		bgColor:"gray",
		color:"green",
		borderColor:"#000",
		borderWidth:2,
	},
	Result : {
		width:400,
		height:300,
		bgImage:"result-bg.png"
	},
	Button : {
		Result : {
			width:120,
			height:50,
			bgImage:"button-bg.png"
		},
		Result_Text : {
			color:"yellow",
			fontSize:30,
			width:120,
			height:50,
			shadow:1
		},
		Pause : {
			width:120,
			height:50,
			bgImage:"button-bg.png"
		},
		Pause_Text : {
			color:"yellow",
			fontSize:30,
			width:120,
			height:50,
			shadow:1
		},
	},
};

})();
