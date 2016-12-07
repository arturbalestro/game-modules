// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();

// Create the canvas
//var pokelab = document.getElementById('pokelab');
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
console.log("here's the json data: ", pokelabMap);
canvas.width = 960;
canvas.height = 576;
document.body.appendChild(canvas);

// The main game loop
var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

function init() {
    //terrainPattern = ctx.createPattern(resources.get('img/tilesets/pokelab.png'), 'repeat');

    /*document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });*/

    //reset();
    lastTime = Date.now();
    main();
}

resources.load([
	'img/tilesets/pokelab.png',
  'img/trainers/red.png',
  'img/trainers/profelm.png',
  'img/pokemons/kanto/charmander.png',
  'img/pokemons/kanto/lapras.png'
]);
resources.onReady(init);

var player = {
  pos: [448, 480],
  sprite: new Sprite('player', 'img/trainers/red.png', [0, 192], [0, 0], [48, 64], 4, [0, 1, 2, 3])
};

var charmander = {
	pos: [448, 350],
	sprite: new Sprite('pokemon', 'img/pokemons/kanto/charmander.png', [0, 64], [0, 0], [32, 32], 2, [0, 1], 'vertical')
}

var lapras = {
	pos: [448, 150],
	sprite: new Sprite('pokemon', 'img/pokemons/kanto/lapras.png', [0, 64], [0, 0], [32, 32], 2, [0, 1], 'vertical')
}

var gameTime = 0;
var isGameOver;
var enemies = [];

// Speed in pixels per second
var playerSpeed = 100;
var enemySpeed = 100;

var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
var rowTileCount = 18;   // The number of tiles in a row of our background
var colTileCount = 30;   // The number of tiles in a column of our background
var imageNumTiles = 8;  // The number of tiles per row in the tileset image

// Update game objects
function update(dt) {
    gameTime += dt;

    handleInput(dt, checkCollisions());
    updateEntities(dt);

    // It gets harder over time by adding enemies using this
    // equation: 1-.993^gameTime
    // if(Math.random() < 1 - Math.pow(.993, gameTime)) {
    //     enemies.push({
    //         pos: [canvas.width,
    //               Math.random() * (canvas.height)],
    //         sprite: new Sprite('img/pokemons/kanto/charmander.png', [0, 128], [0, 0], [64, 64],
    //                            2, [0, 1])
    //     });
    // }

    checkCollisions();
};

function handleInput(dt, collided) {
    if(input.isDown('DOWN') || input.isDown('s')) {
    	player.sprite.update(dt);
      player.sprite.bgpos = [0, 0];

      if(!collided.hasCollision) {
      	player.pos[1] += playerSpeed * dt;
      }else{
      	//player.pos[1] = collided.object.height - collided.object.sprite.size[1];
      	player.pos[1] -= 20;
      }
    }

    if(input.isDown('UP') || input.isDown('w')) {
    	player.sprite.update(dt);
      player.sprite.bgpos = [0, 192];

      if(!collided.hasCollision) {
      	player.pos[1] -= playerSpeed * dt;
      }else{
      	//player.pos[1] = collided.object.height - collided.object.sprite.size[1];
      	player.pos[1] += 20;
      }
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
    	player.sprite.update(dt);
      player.sprite.bgpos = [0, 64];

      if(!collided.hasCollision) {
      	player.pos[0] -= playerSpeed * dt;
      }else{
      	//player.pos[0] = collided.object.width - collided.object.sprite.size[0];
      	player.pos[0] += 20;
      }
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
    	player.sprite.update(dt);
      player.sprite.bgpos = [0, 128];

      if(!collided.hasCollision) {
      	player.pos[0] += playerSpeed * dt;
      }else{
      	//player.pos[0] = collided.object.width - collided.object.sprite.size[0];
      	player.pos[0] -= 20;
      }
    }

    if(input.isDown('SPACE')) {
      var x = player.pos[0] + player.sprite.size[0] / 2;
      var y = player.pos[1] + player.sprite.size[1] / 2;
    }
}

function updateEntities(dt) {
    // Update the player sprite animation
    //player.sprite.update(dt);

    charmander.sprite.update(dt);
    lapras.sprite.update(dt);

    // Update all the enemies
    for(var i=0; i<enemies.length; i++) {
        enemies[i].pos[0] -= enemySpeed * dt;
        enemies[i].sprite.update(dt);

        // Remove if offscreen
        if(enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
            enemies.splice(i, 1);
            i--;
        }
    }
}

// Collisions

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();

    var collided = {};
    collided.hasCollision = false;
    
    var pos = charmander.pos;
    var size = charmander.sprite.size;
    if(boxCollides(pos, size, player.pos, player.sprite.size)) {
    	collided.object = charmander;
    	collided.hasCollision = true;
    	console.log(collided);
    }

    return collided;
    
    // Run collision detection for all enemies and bullets
    for(var i=0; i<enemies.length; i++) {
        var pos = enemies[i].pos;
        var size = enemies[i].sprite.size;

        if(boxCollides(pos, size, player.pos, player.sprite.size)) {
            // Remove the enemy
            enemies.splice(i, 1);
            i--;
        }
    }
}

function checkPlayerBounds() {
    // Check bounds
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}

function drawTilemap(context, layer, tilesetImage) {
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

function drawObject(context, layer, tilesetImage) {
	for (var obj = 0; obj < layer.length; obj++) {
    var tile = layer[obj];
    var tileId = tile.gid - 1;
    var tileClipX = (tileId % imageNumTiles) | 0;
    var tileClipY = (tileId / imageNumTiles) | 0; // Bitwise OR operation
		context.drawImage(tilesetImage, (tileClipX * tileSize), (tileClipY * tileSize), tileSize, tileSize, tile.x, tile.y - tileSize, tileSize, tileSize);
  }
}

// Draw everything
function render() {
  //ctx.fillStyle = terrainPattern;
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  var tilesetImage = resources.get('img/tilesets/pokelab.png');

	for(var layer = 0; layer < pokelabMap.layers.length; layer++) {
 		var layerType = pokelabMap.layers[layer].type;
 		if(layerType === "tilelayer") {
 			drawTilemap(ctx, pokelabMap.layers[layer].data, tilesetImage);
 		}

 		if(layerType === "objectgroup") {
 			drawObject(ctx, pokelabMap.layers[layer].objects, tilesetImage);
 		}
 	}

 	ctx.save();
 	renderEntity(player);
 	renderEntity(charmander);
 	renderEntity(lapras);
 	ctx.restore();
  renderEntities(enemies);
};

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

// function start() { //Início da função Start
// 	$("#inicio").hide();

// 	$("#fundoGame").append("<div id='jogador'></div>");
// 	/*$("#fundoGame").append("<div class='pokemon animaPokeRight' style='top: 100px;'></div>");
// 	$("#fundoGame").append("<div class='pokemon animaPokeLeft' style='top: 150px;'></div>");
// 	$("#fundoGame").append("<div class='pokemon animaPokeTop' style='top: 200px;'></div>");*/

// 	//Principais variáveis do jogo
// 	var game = {}
// 	var velocidade = 5;
// 	var fimdejogo = false;
// 	var stopMoving = false;

// 	game.timer = setInterval(loop,300);

// 	var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
// 	var rowTileCount = 18;   // The number of tiles in a row of our background
// 	var colTileCount = 30;   // The number of tiles in a column of our background
// 	var imageNumTiles = 8;  // The number of tiles per row in the tileset image

// 	var tilesetImage = resources.get('img/tilesets/pokelab.png');

// 	function loop() {
// 		colisao();
// 		moveSprite(player, ctx, 30);
// 		requestAnimFrame(loop);
// 	}

// 	for(var layer = 0; layer < pokelabMap.layers.length; layer++) {
// 		var layerType = pokelabMap.layers[layer].type;
// 		if(layerType === "tilelayer") {
// 			drawTilemap(ctx, pokelabMap.layers[layer].data);
// 		}

// 		if(layerType === "objectgroup") {
// 			drawObject(ctx, pokelabMap.layers[layer].objects);
// 		}
// 	}

// 	/*var player = resources.get('img/trainers/red.png');
// 	drawPlayer(ctx, player);*/

// 	player.sprite.render(ctx);

// 	var npc = resources.get('img/trainers/profelm.png');
// 	drawNPC(ctx, npc);

// 	function drawTilemap(context, layer) {
//   	for (var r = 0; r < rowTileCount; r++) {
//       for (var c = 0; c < colTileCount; c++) {
//         var tile = (layer[ r ][ c ]) - 1;
//         // Steps 2 and 3
//         var tileClipX = (tile % imageNumTiles) | 0;
//       	var tileClipY = (tile / imageNumTiles) | 0; // Bitwise OR operation
// 				context.drawImage(tilesetImage, (tileClipX * tileSize), (tileClipY * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
//       }
//     }
// 	}

// 	function drawObject(context, layer) {
//   	for (var obj = 0; obj < layer.length; obj++) {
//       var tile = layer[obj];
//       var tileId = tile.gid - 1;
//       var tileClipX = (tileId % imageNumTiles) | 0;
//       var tileClipY = (tileId / imageNumTiles) | 0; // Bitwise OR operation
// 			context.drawImage(tilesetImage, (tileClipX * tileSize), (tileClipY * tileSize), tileSize, tileSize, tile.x, tile.y - tileSize, tileSize, tileSize);
//     }
// 	}

// 	function drawPlayer(context, layer) {
// 		var tileClipX = (192 % 4) | 0;
//     var tileClipY = (256 / 4) | 0; // Bitwise OR operation
// 		context.drawImage(layer, 0, 192, 48, 64, 448, 544 - (tileSize * 2), 48, 64);
// 	}

// 	function drawNPC(context, layer) {
// 		var tileClipX = (192 % 4) | 0;
//     var tileClipY = (256 / 4) | 0; // Bitwise OR operation
// 		context.drawImage(layer, 0, 0, 48, 64, 384, 224 - (tileSize * 2), 48, 64);
// 	}

// 	function clearCanvas(canvas, ctx) {
// 	  ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	}
// } //Fim da função Start

function reiniciaJogo() {
	$("#fim").remove();
	start();
}