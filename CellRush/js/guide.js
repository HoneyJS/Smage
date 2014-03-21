/***
 * 新手引导
 * @author Rhine
 * @version 2014-3-21
 */
(function(){
	var Game = Smage.CellRush;
	var Guide = new Honey.Node({
		fullScreen:1,
		z:9999,
		add:[
			[Define.Element.Image, {name:"bg", image:"guide.jpg", alignParent:Define.Const.Align_CC}],
			[Define.Element.Image, {x:300, y:310, image:"hand.png", _count:0, schedule:[function() {
				this._count = (this._count+1)%50;
				if (this._count > 30) return;
				this.x(Guide.bg.x()+300-80*this._count/30);
				this.y(Guide.bg.y()+310);
			}, 3]}]
		],
		showGuide:function(callback) {
			this._callback = callback;
			Honey.body.add(this);
		},
		saveGuide:function() {
			Game.Rule.storage.guided = 1;
			Honey.Storage.set("CellRush", Game.Rule.storage);
		}
	}, {bgColor:"#000"}, {onclick:function(){
		this.removed();
		//this.saveGuide();
		this._callback && this._callback();
	}});
	Game.Guide = Guide;

	//适配
	EventM.regist("resize", Guide, function(){
		this.width(Honey.body.width());
		this.height(Honey.body.height());
	});
})();