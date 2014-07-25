//D66
//indicar en una cadena los recursos: audios, imagenes, tmx, json
//callback para configurar los sprites
var recursos = "bump.ogg, patada.mp3, salto_enano.mp3, tema_superficie.mp3, jugador.json, mundo1_terminado.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png, enemigosBajos.json, mosaicos_enemigos_32x32.png, tortuga.json, mosaicos_enemigos_32x46.png";

Q.loadTMX(recursos, function() {
	//se ejecuta hasta que los recursos estén listos
	//compilar el spritesheet del jugador
	Q.compileSheets("mosaicos_mario_enano_30x30.png", "jugador.json");
	//los sprites de goombat se compilan el archivo goomba.json
	Q.compileSheets("mosaicos_enemigos_32x32.png", "enemigosBajos.json");
	Q.compileSheets("mosaicos_enemigos_32x46.png", "tortuga.json");
	//ejecutamos la escena
	Q.stageScene("score", 1);
	Q.stageScene("mundo1");

}, {
	progressCallback : function(leidos, totales) {
		var porcentaje = Math.floor((leidos / totales) * 100);
		$("#barra").css("width", porcentaje + "%");

		if (leidos === totales) {
			$("#contenedor-barra").remove();
		}
	}
});

//le pegamos una bandera al objeto que representa nuestro juego
Q.pausado = false;

//-- con el metodo click escuchamos a alguien
//selecciona al boton cuyo id es el #boton-pausa (jquery)
$("#boton-pausa").click(function() {
	//aquí va el código que se ecuta cuando alguien da click
	var esteBoton = $(this);

	//si el juego esta pausado y el usuario presiona el boton reanudamos el jego
	if (Q.pausado === true) {
		
		Q.stage(0).unpause();
		
		esteBoton.html("Pausar");
		Q.pausado = false;
	} else {
		//el juego está corriendo y el usuario presiona pausar
		Q.stage(0).pause();
		//el método html cambia el contenido de una etiqueta html
		esteBoton.html("Reanudar");
		Q.pausado = true;
	}

});
