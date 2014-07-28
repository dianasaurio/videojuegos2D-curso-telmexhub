Q.Sprite.extend("TuberiaEntrada", {//debe ser el mismo que le das al sprite en el mapa
	init : function(p) {
		this._super(p, {
			sheet : "tuberias",
			frame : 2
		});
		this.add("2d");
	}
});
