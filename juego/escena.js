//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1", function(stage){
	//confugurar escena (stage)
	//cargar el archivo TMX
	Q.stageTMX("mundo1_terminado.tmx",stage);
	
	//obtener mi capa de fondo
	var capaFondo = Q("TileLayer").first();
	
	//La camara siga a mario
	stage.add("viewport").follow(Q("Jugador").first(),{
		x: true,
		y: true
	},{
		minX: 32,
		maxX: capaFondo.p.w - 32,// me devuelve el ancho de la capa de cielo, es igual que el ancho del canvas
		minY: 0,
		maxY: capaFondo.p.h
	});
} );
