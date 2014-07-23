//D66
//indicar en una cadena los recursos: audios, imagenes, tmx, json
//callback para configurar los sprites
var recursos = "jugador.json, mundo1_terminado.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png, goomba.json, mosaicos_enemigos_32x32.png, tortuga.json, mosaicos_enemigos_32x46.png";

Q.loadTMX(recursos, function(){
	//se ejecuta hasta que los recursos estén listos
	//compilar el spritesheet del jugador
	Q.compileSheets("mosaicos_mario_enano_30x30.png", "jugador.json");
	//los sprites de goombat se compilan el archivo goomba.json
	Q.compileSheets("mosaicos_enemigos_32x32.png","goomba.json");
	Q.compileSheets("mosaicos_enemigos_32x46.png","tortuga.json");
	//ejecutamos la escena
	Q.stageScene("mundo1");
});
