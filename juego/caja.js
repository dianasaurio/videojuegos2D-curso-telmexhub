Q.animations("animacionesCaja", {
	brillar : {
		frames : [2, 3, 4],
		rate : 1 / 3,
		loop: true
	},
	apagado: {
		frames: [5],
		rate: 1 / 2,
		loop: false
	}
});

Q.Sprite.extend("HongoVida", {//debe ser el mismo que le das al sprite en el mapa
	init : function(p) {
		this._super(p, {
			sheet : "objetos",
			frame : 1,
			vx: 150,
			//deshbilitamos temporalmente las colisiones
			sensor: true
		});
		this.add("animation, tween, aiBounce");
		
		//hit es para escuchar cualquier colision
		this.on("hit", function(colision){
			if(colision.obj.isA("Jugador")){
				this.destroy();
			}
		});
	}
});


Q.Sprite.extend("Caja", {//debe ser el mismo que le das al sprite en el mapa
	init : function(p) {
		this._super(p, {
			sprite: "animacionesCaja",
			sheet : "objetos",
			frame : 3,
			gravity : 0//deshabilitamos la gravedad
		});
		this.add("2d, animation");
		this.play("brillar");
		
		this.on("bump.bottom", function(colision){
			if(colision.obj.isA("Jugador")){
				this.play("apagado");
				
				//insertamos al honguito
				var hongo = new Q.HongoVida({
					x: this.p.x,
					y: this.p.y
				});
				this.stage.insert(hongo);
				//una vez insertado el hongo, hacemos animación tween
				hongo.animate({
					y: this.p.y - 35
				}, 0.5,{
					callback: function(){
						this.p.sensor = false;
						this.add("2d");
					}
				});
			}
		});
	}
});
