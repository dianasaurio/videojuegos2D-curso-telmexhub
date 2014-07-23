//Definimos animaciones
Q.animations("animacionesGoomba", {
	//caminar
	caminar: {
		frames: [0, 1],
		rate: 1 / 2, //van a pasar 6 frames por segundo
		loop: true
	}
});

Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesGoomba",
			sheet: "goomba",
			frame: 0,
			vx:170
		});
		this.add("2d, aiBounce, animation");
		//La animacion caminar se ejecuta siempre
		this.play("caminar");
	}
	//esta funcion se repite continuamente (Game Loop)
	
});