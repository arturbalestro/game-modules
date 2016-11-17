resources.load([
	'img/tilesets/pokelab.png',
  'img/trainers/red.png',
  'img/trainers/profelm.png'
]);
resources.onReady(start);

function start() { //Início da função Start
	$("#inicio").hide();

	$("#fundoGame").append("<div id='jogador'></div>");
	/*$("#fundoGame").append("<div class='pokemon animaPokeRight' style='top: 100px;'></div>");
	$("#fundoGame").append("<div class='pokemon animaPokeLeft' style='top: 150px;'></div>");
	$("#fundoGame").append("<div class='pokemon animaPokeTop' style='top: 200px;'></div>");*/

	//Principais variáveis do jogo
	var game = {}
	var velocidade = 5;
	var fimdejogo = false;
	var stopMoving = false;

	game.timer = setInterval(loop,300);

	function loop() {
		colisao();
		movejogador(30);
	}

	var pokelab = document.getElementById('pokelab');
	var ctx = pokelab.getContext('2d');
	console.log("here's the json data: ", pokelabMap);

	var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
	var rowTileCount = 18;   // The number of tiles in a row of our background
	var colTileCount = 30;   // The number of tiles in a column of our background
	var imageNumTiles = 8;  // The number of tiles per row in the tileset image

	var tilesetImage = resources.get('img/tilesets/pokelab.png');

	for(var layer = 0; layer < pokelabMap.layers.length; layer++) {
		var layerType = pokelabMap.layers[layer].type;
		if(layerType === "tilelayer") {
			drawTilemap(ctx, pokelabMap.layers[layer].data);
		}

		if(layerType === "objectgroup") {
			drawObject(ctx, pokelabMap.layers[layer].objects);
		}
	}

	var player = resources.get('img/trainers/red.png');
	drawPlayer(ctx, player);

	var npc = resources.get('img/trainers/profelm.png');
	drawNPC(ctx, npc);

	function drawTilemap(context, layer) {
  	for (var r = 0; r < rowTileCount; r++) {
      for (var c = 0; c < colTileCount; c++) {
        var tile = (layer[ r ][ c ]) - 1;
        // Steps 2 and 3
        var tileClipX = (tile % imageNumTiles) | 0;
      	var tileClipY = (tile / imageNumTiles) | 0; // Bitwise OR operation
				context.drawImage(tilesetImage, (tileClipX * tileSize), (tileClipY * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
      }
    }
	}

	function drawObject(context, layer) {
  	for (var obj = 0; obj < layer.length; obj++) {
      var tile = layer[obj];
      var tileId = tile.gid - 1;
      var tileClipX = (tileId % imageNumTiles) | 0;
      var tileClipY = (tileId / imageNumTiles) | 0; // Bitwise OR operation
			context.drawImage(tilesetImage, (tileClipX * tileSize), (tileClipY * tileSize), tileSize, tileSize, tile.x, tile.y - tileSize, tileSize, tileSize);
    }
	}

	function drawPlayer(context, layer) {
		var tileClipX = (192 % 4) | 0;
    var tileClipY = (256 / 4) | 0; // Bitwise OR operation
		context.drawImage(layer, 0, 192, 48, 64, 448, 544 - (tileSize * 2), 48, 64);
	}

	function drawNPC(context, layer) {
		var tileClipX = (192 % 4) | 0;
    var tileClipY = (256 / 4) | 0; // Bitwise OR operation
		context.drawImage(layer, 0, 0, 48, 64, 384, 224 - (tileSize * 2), 48, 64);
	}

	function clearCanvas(canvas, ctx) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
} //Fim da função Start

function reiniciaJogo() {
	$("#fim").remove();
	start();
}