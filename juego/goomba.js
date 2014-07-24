//Definimos animaciones
Q.animations("animacionesGoomba", {
	//caminar
	caminar: {
		frames: [0, 1],
		rate: 1 / 2, //van a pasar 6 frames por segundo
		loop: true
	},
	aplastar: {
		frames: [3],
		rate: 1 / 2,
		loop: false,
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
		//vamos a escuchar las colisiones por arriba
		this.on("bump.top", this, "aplasta");
		//trigger
		this.on("destruir", function(){
			this.destroy();
		});
	},
	aplasta: function(colision){
		//revisar si colisioné con Mario
		if(colision.obj.isA("Jugador")){
			//goomba muere
			this.play("aplastar");
			this.destroy();
		}
	},
	/*destruir: function(){
		this.destroy();
	}*/
	//esta funcion se repite continuamente (Game Loop)
	
});