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
	
	//declaramos una variable de estado
	//las variables de estado estan asociadas con el juego
	//su juego esta representado con el objeto Q
	//utilizamos este metodo porque las variables de javascript
	//son inherentemente malvadas ):<
	Q.state.set("tiempo",10);
	
	
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
	
	//insertamos el timer del juego
	//estamos instanciando la clase ContadorTiempo que creamos abajo
	var contadorTiempo = new Q.ContadorTiempo();
	//insertamos el contador en el stage
	stage.insert(contadorTiempo);
	
	//definimos un set interval para que decremente el contador del tiempo
	//el primer argumento es la funcion que se ejecuta en un periodo de tiempo
	//el segundo argumento es el periodo
	setInterval(function(){
		var tiempo = Q.state.get("tiempo");
		if(tiempo > 0 && Q.pausado === false){
			Q.state.dec("tiempo", 1);
		}
	}, 1000);
});



//---------LÓGICA DEL TIMER DEL JUEGO------------------

Q.UI.Text.extend("ContadorTiempo", {
	init: function(p){
		this._super(p,{
			label: "10",
			color: "green",
			y: 20,
			x: Q.width / 2,
			size: 20,
			family: 'Share Tech Mono'
		});
		//el metodo on permite escuchar eventos
		//el evento change.tiempo se produce cuando alguien invoca Q.state.dec o Q.state.inc 
		Q.state.on("change.tiempo", this, "actualizaTiempo");
	},
	actualizaTiempo: function(tiempo){
		this.p.label = "" + tiempo;
	}
	
});
