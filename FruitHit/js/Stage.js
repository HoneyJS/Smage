/**
 * Stage 舞台
 * @author Rhine
 * @version 2013-11-28
 */
(function(){
var Game = Smage.FruitHit;
var Stage = new Honey.Node(
	{
		fullScreen : 1,
		clickBreak : 1,
		showLoading : function(val) {
			this.Center.loading.display(val);
			this.Center.Board.display(!val);
		},
		schedule : [function(){
			this.updateTime();
		}, 50],
		updateTime : function() {
			Game.Rule.updateTime();
			this.Center.TimerBar.percent(100*Game.Rule.leftTime/Game.Rule.totalTime);
			this.updateInfo();
		},
		updateInfo : function() {
			this.Center.Info.content("分数:"+Game.Rule.score+"   时间:"+Game.Rule.leftTime+"s");
		},
		addCell : function(cell) {
			var xy = cell.getSeatXY();
			cell.x(xy[0]);
			cell.y(xy[1]);
			cell.added();
			return this.Center.Board.add(cell);
		},
		//加分
		addScore : function(score) {
			var s = this.Center.add("LineText", {z:10, content:"+"+score, x:this.Center.width()/2-50, y:this.Center.height()/2-50}, Honey.Styles.FruitHit.Score);
			s.addAction([
				Honey.Action.ScaleTo(150, 1.5, 1.5),
				Honey.Action.ScaleTo(750, 2, 2),
				//Honey.Action.Create(750, {ScaleTo:[2, 2], AlphaTo:0.5}),
				Honey.Action.ScaleTo(150, 0.2, 0.2),
				//Honey.Action.Create(300, {ScaleTo:[0.1, 0.1], AlphaTo:0.1}),
				function(){
					this.removed();
				}
			]);
			this.updateInfo();
		},
		//时间
		addTime : function(time) {
			var s = this.Center.add("LineText", {z:10, content:(time>0?"+"+time:time)+"s", x:this.Center.width()/2-75, y:this.Center.height()/2-200}, Honey.Styles.FruitHit.Time);
			if (time <= 0) s.Style.color = "#f00";
			s.addAction([
				Honey.Action.ScaleTo(500, 1.5, 1.5),
				Honey.Action.Create(300, {MoveTo:[270, 0], ScaleTo:[0.4, 0.4], AlphaTo:0.4}),
				function(){
					this.removed();
				}
			]);
			this.updateInfo();
		},
		showResult : function() {
			this.Result.showResult();
		},
	},
	{
		bgImage:"bg.jpg",
	}
);
Game.Stage = Stage;

//中心区域
Stage.add("Node", {name:"Center"}, Honey.Styles.FruitHit.Center);
//适配
EventM.regist("resize", Stage, function(){
	this.width(Honey.body.width());
	this.height(Honey.body.height());
	this.Center.x((this.width()-this.Center.width())/2);
	this.Center.y((this.height()-this.Center.height())/2);
	this.grayBG.width(this.width());
	this.grayBG.height(this.height());
});

//资源加载中
Stage.Center.add("LineText", {name:"loading", content:"loading...", align:"center", width:Stage.Center.width(), height:Stage.Center.height()}, {color:"white"});
//信息
Stage.Center.add("LineText", "Info", 0, 10, "", {width:Stage.Center.width(), align:"center"}, Honey.Styles.FruitHit.Info);
Stage.Center.add("Element", {
	name : "TimerBar",
	y : 50,
	_percent : 100,
	percent : getset("_percent", function(){
		this.dirty();
	}),
}, Honey.Styles.FruitHit.TimerBar);
Stage.Center.TimerBar.draw = function(context, rects) {
	context.fillRect(1, 1, (this.width()-2)*Math.min(this._percent/100, 1), this.height()-2);
};
Stage.Center.TimerBar.x((Stage.Center.width() - Stage.Center.TimerBar.width()) / 2);
//图块板
Stage.Center.add("Node", {
	name:"Board", 
	y:80, 
	width:Game.Config.CellWidth*Game.Config.CellX, 
	height:Game.Config.CellHeight*Game.Config.CellY
}, null, {
	onclick: function(x, y) {
		var xy = this.xyToBody();
		x -= xy[0];
		y -= xy[1];
		Game.Rule.onclick(parseInt(x/Game.Config.CellWidth), parseInt(y/Game.Config.CellHeight));
	},
});
//背景格子
forloop (Game.Config.CellX, function(i){
	forloop (Game.Config.CellY, function(j){
		Stage.Center.Board.add("Element", 0, Game.Config.CellWidth*i, Game.Config.CellHeight*j, Game.Define.CellBackImage, {z:-1, width:Game.Config.CellWidth, height:Game.Config.CellHeight}, {bgColor:(i+j)%2?"#bbb":"#999"});
	});
});

//操作按钮
Stage.Center.add("Button", "Finish", (Stage.Center.width()-Honey.Styles.FruitHit.Button.Pause.width)/2, Stage.Center.Board.y()+Stage.Center.Board.height()+10, function(){
	Game.Rule.end();
}, {front:[Define.Element.LineText, {text:"结束", align:"center"}, Honey.Styles.FruitHit.Button.Pause_Text]}, Honey.Styles.FruitHit.Button.Pause);

//结果
	Stage.add("Element", {name:"grayBG", z:99, display:0, width:Stage.width(), height:Stage.height()}, {bgColor:"#000", bgAlpha:0.6});
	Stage.add("Node", {
		name:"Result",
		z:100,
		clickMask:1,
		display:0,
		alignParent:Define.Const.Align_CC,
		add:[
			["LineText", {y:40, width:200, align:"right", x:20, text:"分数:"}, Honey.Styles.FruitHit.Info],
			["LineText", {y:40, width:200, align:"left", x:240, name:"score"}, Honey.Styles.FruitHit.Info],
			["LineText", {y:90, width:200, align:"right", x:20, text:"你的纪录:"}, Honey.Styles.FruitHit.Info],
			["LineText", {y:90, width:200, align:"left", x:240, name:"myRecord"}, Honey.Styles.FruitHit.Info],
			["LineText", {y:140, width:200, align:"right", x:20, text:"世界纪录:"}, Honey.Styles.FruitHit.Info],
			["LineText", {y:140, width:200, align:"left", x:240, name:"worldRecord"}, Honey.Styles.FruitHit.Info],
			["Button", "again", 70, 210, function(){
				Stage.Result.display(0);
				Stage.grayBG.display(0);
				Game.Rule.start();
			}, {front:[Define.Element.LineText, {text:"重来", align:"center"}, Honey.Styles.FruitHit.Button.Result_Text]}, Honey.Styles.FruitHit.Button.Result],
			["Button", "quit", 210, 210, function(){
				Stage.Result.display(0);
				Stage.grayBG.display(0);
				Game.quit();
			}, {front:[Define.Element.LineText, {text:"退出", align:"center"}, Honey.Styles.FruitHit.Button.Result_Text]}, Honey.Styles.FruitHit.Button.Result],
		],
		showResult:function(){
			this.score.content(Game.Rule.score);
			this.myRecord.content(Game.Rule.storage.myRecord);
			this.worldRecord.content(Game.Rule.worldRecord);
			Game.Stage.Result.show();
			Stage.grayBG.display(1);
		},
		show: function() {
			if (this.display()) return;
			this.scale(0.1, 0.1);
			this.addAction([Honey.Action.ScaleTo(300, 1.2, 1.2), Honey.Action.ScaleTo(200, 0.8, 0.8), Honey.Action.ScaleTo(100, 1, 1)]);
			this.display(1);
		},
	}, Honey.Styles.FruitHit.Result);

/*
forloop (Game.Config.CellX, function(i){
	forloop (Game.Config.CellY, function(j){
		Stage.Center.Board.add("Image", 0, Game.Config.CellWidth*i, Game.Config.CellHeight*j, Game.Define.CellBackImage, {z:-1, width:Game.Config.CellWidth, height:Game.Config.CellHeight});
	});
});
*/
/*移动时屏蔽
Stage.Center.Board.add("Element", {z:100, width:Stage.Center.Board.width(), height:Stage.Center.Board.height()}, null, {
	onmousedown: function(x, y, evt) {
		if (Game.Rule.isSeating()) return 1;
	}
});
*/
})();
