//crear un texto que corresponde al numero de goombas muertos
//esta clase se extendera de la clase UI.Text
Q.UI.Text.extend("PuntosGoomba", {
	init: function(p){
		this._super(p,{
			label: "0",
			color: "green",
			y: 20,
			x: Q.width - 60,
			size: 20,
			family: 'Share Tech Mono'
		});
		//escuchar el evento change.goombasMuertos
		Q.state.on("change.goombasMuertos", this, "actualizaPuntaje");
	},
	
	actualizaPuntaje: function(puntajeGoombas){
		//actualizar el label
		this.p.label = "" + puntajeGoombas;
	}
});

//definir la escena de score
Q.scene("score", function(stage){
	//creamos una variable del game state
	Q.state.set("goombasMuertos", 0);
	
	//creamos un objeto de tipo PuntosGoomba
	var valorPuntaje = new Q.PuntosGoomba();
	
	//creando un elemento texto que diga "Goombas"
	var textoPuntaje = new Q.UI.Text({
		label: "Goombas ",
		color: "black",
		y: 20,
		x: Q.width -160,
		size: 20,
		family: 'Share Tech Mono'
	});
	//insertar el texto en el stage
	stage.insert(textoPuntaje);
	stage.insert(valorPuntaje);
});
