Q.Sprite.extend("Tortuga",{
	init: function(p){
		this._super(p,{
			sheet: "tortuga",
			frame: 0,
			vx:100
		});
		this.add("2d, aiBounce");
	}
	//esta funcion se repite continuamente (Game Loop)
	
});