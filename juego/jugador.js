//Definir animaciones: caminar, saltar
//Atributos de animaciones: frames, velocidad de frame, 
Q.animations("animacionesMario", {
	//caminar
	caminar: {
		frames: [4, 5, 8],
		rate: 1 / 6, //van a pasar 6 frames por segundo
		loop: false
	},
	saltar: {
		frames: [2],
		rate: 1 / 2,
		loop: false
	},
	quieto: {
		frames: [1],
		rate: 1 / 2,
		loop: false
	}
});

//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesMario",
			sheet: "jugador",
			frame: 1,
			jumpSpeed: -800,
			speed:150
		});
		this.add("2d, platformerControls, animation");
	},
	//esta funcion se repite continuamente (Game Loop)
	step: function(){
		//Si el jugador va a la izquierda y tecleo derecha
		if(this.p.direction === "left" && Q.inputs["right"]){
			this.p.flip = false;
		}
		//Si el jugador va a la derecha y tecleo izquierda
		if(this.p.direction === "right" && Q.inputs["left"]){
			this.p.flip = "x";
		}
		//ejecutar animación de caminar
		if(this.p.vx != 0){
			this.play("caminar");
		}
		//ejecutar animacion de saltar
		if(this.p.vy < 0){
			Q.audio.play("salto_enano.mp3",{
				debounce: 1000
			});
			this.play("saltar");
		}
		//ejecutar animacion de quieto
		if(this.p.vx === 0 && this.p.vy === 0){
			this.play("quieto");
		}		
	}
	
});
