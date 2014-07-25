//Definir animaciones: caminar, saltar
//Atributos de animaciones: frames, velocidad de frame,
Q.animations("animacionesMario", {
	//caminar
	caminar : {
		frames : [4, 5, 8],
		rate : 1 / 6, //van a pasar 6 frames por segundo
		loop : false
	},
	saltar : {
		frames : [2],
		rate : 1 / 2,
		loop : false
	},
	quieto : {
		frames : [1],
		rate : 1 / 2,
		loop : false
	},
	muere : {
		frames : [12],
		rate : 1 / 2,
		loop : false,
		trigger: "casiMuerto"
	}
});

//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador", {
	init : function(p) {
		this._super(p, {
			sprite : "animacionesMario",
			sheet : "jugador",
			frame : 1,
			jumpSpeed : -800,
			speed : 150,
			estaVivo : true
		});
		this.add("2d, platformerControls, animation, tween");
		//Escuchamos el evento casiMuerto que detona el trigger de la animacion morir
		this.on("casiMuerto", this, function(){
			
			//deshabilitamos la gravedad para este sprite
			this.del("2d");//así también se pueden deshabilitar los controles
			
			//ejecutamos la animación tween
			this.animate({
				//mueve el sprite a la posicion indicadaS
				y: this.p.y -100
			}, 0.5, {
				//esta funcion se ejecuta cuando la animación tween termina
				callback: function(){
					//ejecutamos otra animación tween para sacar a mario del escenario
					this.animate({
						y:Q("TileLayer").first().p.h
					}, 0.5, {
						callback: function(){
							this.destroy();
						}
					});
				}
			});
		});

		//escuchamos las colisiones sobre mario
		this.on("bump.left, bump.right, bump.top", function(colision) {

			//si el objeto con el que chocó mario es un enemigo, mario muere
			if (colision.obj.p.enemigo === true) {
				//deshabilitamos los controles
				this.p.ignoreControls = true;
				//cambiamos la bandera de vida
				this.p.estaVivo = false;
				
				//detenemos a todos los enemigos
				//Q(nombre) regresa un arreglo con todos los sprites que son de esa clase
				Q("Goomba").items.forEach(function(enemigo){
					//por cada goomba se le quita la velocidad
					enemigo.p.vx = 0;
					enemigo.p.animation = null;
				});
				
				Q("Tortuga").items.forEach(function(enemigo){
					//por cada goomba se le quita la velocidad
					enemigo.p.vx = 0;
					enemigo.p.animation = null;
				});
				
				this.play("muere");
				Q.audio.stop();
				Q.audio.play("mario_muere.mp3");
			}
		});
	},
	//esta funcion se repite continuamente (Game Loop)
	step : function() {
		if (this.p.estaVivo === true) {
			//Si el jugador va a la izquierda y tecleo derecha
			if (this.p.direction === "left" && Q.inputs["right"]) {
				this.p.flip = false;
			}
			//Si el jugador va a la derecha y tecleo izquierda
			if (this.p.direction === "right" && Q.inputs["left"]) {
				this.p.flip = "x";
			}
			//ejecutar animación de caminar
			if (this.p.vx != 0) {
				this.play("caminar");
			}
			//ejecutar animacion de saltar
			if (this.p.vy < 0) {
				Q.audio.play("salto_enano.mp3", {
					debounce : 1000
				});
				this.play("saltar");
			}
			//ejecutar animacion de quieto
			if (this.p.vx === 0 && this.p.vy === 0) {
				this.play("quieto");
			}
		}
	}
});
