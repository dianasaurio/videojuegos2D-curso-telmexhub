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
			estaVivo : true,
			z: 1
		});
		this.add("2d, platformerControls, animation, tween");
		//Escucho colisiones con la tubería
		this.on("bump.bottom", function(colision){
			//revisar si colisione con tuberia entrada
			if(colision.obj.isA("TuberiaEntrada") && Q.inputs["down"]){
				//cambiamos de escena
				Q.audio.stop("tema_superficie.mp3");
				Q.stageScene("mundo1Subterraneo", 2);
			}
		});
		
		//escuchar colision por la derecha con la tuberia de salida
		this.on("bump.right",function(colision){
			if(colision.obj.isA("TuberiaSalida") && Q.inputs["right"]){
				//llamar al mundo original
				//darle stop al mundo subterraneo
				this.stage.stop();
				//activar la escena previa (mundo1)
				this.p.escena_previa.start();
				
				//asignar nuevas coordenadas
				this.p.x = 1000;
				this.p.y = 0;
				//el atributo stage de Mario debe ser ahora mundo1
				this.stage = this.p.escena_previa;	
			}
		});
		
		
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
