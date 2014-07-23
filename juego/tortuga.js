//Definir animaciones
Q.animations("animacionesTortuga",{
	caminar: {
		frames: [0, 1],
		rate: 1 / 2, 
		loop: true
	}
});

Q.Sprite.extend("Tortuga",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesTortuga",
			sheet: "tortuga",
			frame: 0,
			vx:100
		});
		this.add("2d, aiBounce, animation");
		this.play("caminar");
	},
	//esta funcion se repite continuamente (Game Loop)
	step: function(){
		//voltear cuando va a la derecha, vx+
		if(this.p.vx > 0){
			this.p.flip = "x";
		}
		//no voltear cuando va a la izquierda, vx-
		if(this.p.vx < 0){
			this.p.flip = false;
		}
	}
	
});