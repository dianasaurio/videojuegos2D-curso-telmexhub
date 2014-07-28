Q.animations("animacionesCaja", {
	brillar : {
		frames : [2, 3, 4],
		rate : 1 / 3,
		loop: true
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
	}
});
