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
			[Define.Element.Image, {image:"guide.jpg", alignParent:Define.Const.Align_CC}],
			[Define.Element.Image, {x:330, y:310, image:"hand.png", _count:0, schedule:[function() {
				this._count = (this._count+1)%30;
				this.x(330-80*this._count/30);
			}, 3]}]
		],
		showGuide:function(callback) {
			this._callback = callback;
			Honey.body.add(this);
		}
	}, {bgColor:"#000"}, {onclick:function(){
		this.removed();
		this._callback && this._callback();
	}});
	Game.Guide = Guide;

	//适配
	EventM.regist("resize", Guide, function(){
		this.width(Honey.body.width());
		this.height(Honey.body.height());
	});
})();