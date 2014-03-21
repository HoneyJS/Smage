/***
 * 新手引导
 * @author Rhine
 * @version 2014-3-21
 */
(function(){
	var Game = Smage.FruitHit;
	var Guide = new Honey.Node({
		fullScreen:1,
		z:9999,
		add:[
			[Define.Element.Image, {name:"bg", image:"guide.jpg", alignParent:Define.Const.Align_CC}],
			[Define.Element.Image, {x:162, y:198, image:"line.png", display:0, schedule:[function() {
				this.x(Guide.bg.x()+162);
				this.y(Guide.bg.y()+198);
				this.toggle();
			}, 30]}]
		],
		showGuide:function(callback) {
			this._callback = callback;
			Honey.body.add(this);
		},
		saveGuide:function() {
			Game.Rule.storage.guided = 1;
			Honey.Storage.set("FruitHit", Game.Rule.storage);
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