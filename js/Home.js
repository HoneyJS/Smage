/**
 * Home 主页
 */
(function(){
var Home = new Honey.Node(
	{
		fullScreen : 1,
		clickBreak : 1,
		quitGame : function() {
			Honey.body.add(Home);
			Honey.fitBody();
		},
		add : [
			[Define.Element.Node, {name:"Games", width:Config.Width, height:Config.Height, alignParent:Define.Const.Align_CC}],
			[Define.Element.LineText, {y:50, text:"Smage", alignParent:Define.Const.Align_CN, height:100}, {color:"#f63", fontSize:80, shadow:1}],
			[Define.Element.LineText, {text:"v1.1.6", alignParent:Define.Const.Align_RB, size:[100, 40]}, {color:"#fff", fontSize:26, shadow:1, fontWeight:"bold"}],
		],
		_bgPosX : 0,
		schedule:[function() {
			this.Style.bgImage(["bg.jpg", (++this._bgPosX)%(1920-648), 0, 648, 1080]);
		}, 5]
	},
	{
		bgImage:["bg.jpg", 0, 0, 648, 1080],
	}
);
Smage.Home = Home;

EventM.regist("resize", Home, function(){
	this.width(Honey.body.width());
	this.height(Honey.body.height());
});

//游戏列表
var games = [
	{
		name:"消方块",
		begin:function(){
			window.location.href = "CellRush/index.html";
			//Honey.body.add(Smage.CellRush.Stage);
			//Smage.CellRush.load();
			return 1;
		},
	},
	{
		name:"打豆豆",
		begin:function(){
			window.location.href = "FruitHit/index.html";
			//Honey.body.add(Smage.FruitHit.Stage);
			//Smage.FruitHit.load();
			return 1;
		},
	},
	{
		name:"关于",
		begin:function(){

		},
	},
];
foreach(games, function(game, i){
	Home.Games.add("Button", "begin"+i, 0, 250+(Honey.Styles.Button.Home.height+20)*i, function(){
		if (this.game.begin()) Home.removed();
	}, {alignParent:Define.Const.Align_CN, game:game, front:[Define.Element.LineText, {text:game.name, align:"center"}, Honey.Styles.Button.Home]}, Honey.Styles.Button.Home);
});

})();
