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
		rate: 1 / 4,
		loop: false,
		trigger: "destruir"
	}
	
});

Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesGoomba",
			sheet: "enemigosBajos",
			frame: 0,
			vx:130
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
			//suene bump
			Q.audio.play("bump.ogg");
			//goomba muere
			this.play("aplastar");
			//this.destroy();
		}
	},

});