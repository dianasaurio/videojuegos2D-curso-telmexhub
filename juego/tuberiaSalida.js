Q.Sprite.extend("TuberiaSalida", {//debe ser el mismo que le das al sprite en el mapa
	init : function(p) {
		this._super(p, {
			sheet : "tuberias",
			frame : 6,
			z: 1
		});
		this.add("2d");
	}
});
