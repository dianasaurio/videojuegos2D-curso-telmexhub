//--------------------Declaración de un componente (hace que la tortuga salte)------------------------------
Q.component("saltarin",{
	added: function(){
		//se ejecuta cuando este componente se agrega a un sprite
		//los componentes nos permiten modificar el game loop del sprite y sus propiedades
		this.entity.on("step", this, "saltar");//se refiere al sprite al que se le aplica el componente
	},
	saltar: function(){
		//checamos si su velocidad en el eje y es cero
		if(this.entity.p.vy === 0){
			this.entity.p.vy = -400;
		}
	}
});

//Definir animaciones
Q.animations("animacionesTortuga",{
	caminar: {
		frames: [0, 1],
		rate: 1 / 2, 
		loop: true
	},
	enconchar: {
		frames:[2, 4],
		rate: 1 / 4,
		loop: false
	}
});


Q.Sprite.extend("Tortuga",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesTortuga",
			sheet: "tortuga",
			frame: 0,
			vx:100,
			//definimos nuestras propiedades
			esConcha: false,
			enemigo: true,
			z: 1
			
		});
		this.add("2d, aiBounce, animation, saltarin");
		this.play("caminar");
		//escuchar el evento bump.top
		this.on("bump.top", this, "aConcha");
	},
	aConcha: function(colision){
		//detectar si es mario el que le cayó encima
		if(colision.obj.isA("Jugador")){
			//mario rebota
			colision.obj.p.vy = -500;
			//suena patada.mp3
			Q.audio.play("patada.mp3");
			//si la tortuga no es concha
			if(!this.p.esConcha){
				//cambiar el sheet por el de enemigos bajos
				this.sheet("enemigosBajos",true);
				this.p.esConcha = true;
			}
			//ejecutar animacion
			this.play("enconchar");
			
			if(this.p.vx != 0){
				this.p.vx = 0;
			}else {
				this.p.vx = 500;
			}
		}
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