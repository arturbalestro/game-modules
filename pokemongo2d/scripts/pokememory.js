// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
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
};

function init() {
    /*document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });*/

    //reset();
    lastTime = Date.now();
    main();
}

pokemons.map(function(pokemon) {
  resources.load([
    pokemon.image
  ]);
})
resources.onReady(init);

function randomNumber(x) {
  return Math.floor((Math.random() * x) + 1);
}

function generateTiles() {
  //Step 1: get the pokemon available for the wild
  const tiles = [];
  const wildGroup = trainers.filter(function(trainer) {
    return trainer.name === "Wild";
  });
  const availablePokemon = pokemons.filter(function(pokemon) {
    for(var i = 0; i < pokemon.owners.length; i++) {
      //console.log(pokemon.owners[i].toString(),',',wildGroup[0].id);
      if(pokemon.owners[i].toString() === wildGroup[0].id) {
        return pokemon;
      }
    }
  });
  /*console.log("We have ",availablePokemon.length," Pokémon available", availablePokemon);

  availablePokemon.map(function(pokemon) {
    $(".master").append('<img src="'+pokemon.image+'" height="120" />');
  });*/

  //Step 2: Select a group of random pokemon to appear in the tiles
  const tileGroup = [];
  for(let i = 0; i < 4; i++) {
    const randomPokemon = randomNumber(availablePokemon.length);
    const chosenPokemon = availablePokemon[randomPokemon - 1];
    tileGroup.push(chosenPokemon);
  }

  //Step 3: Duplicate the group of selected pokemon, to be their pairs, and join them all together.
  const tileClone = tileGroup.slice(0);
  const tilePairs = tileGroup.concat(tileClone);

  //Step 4: Render all the tiles on the board randomly. The already drawn tiles are removed from the array.
  for(let j = tilePairs.length; j > 0; j--) {
    const randomPokemon = this.randomNumber(tilePairs.length);
    const chosenPokemon = tilePairs[randomPokemon - 1];

    tiles.push(chosenPokemon);

    const index = tilePairs.indexOf(chosenPokemon);
    if(index > -1) {
      tilePairs.splice(index, 1);
    }
  }

  console.log('group of selected pokemon: ', tiles);

  return tiles;
}

// var player = {
//   pos: [448, 480],
//   sprite: new Sprite('player', 'img/trainers/red.png', [0, 192], [0, 0], [48, 64], 4, [0, 1, 2, 3])
// };

// var charmander = {
// 	pos: [448, 350],
// 	sprite: new Sprite('pokemon', 'img/pokemons/kanto/charmander.png', [0, 64], [0, 0], [32, 32], 2, [0, 1], 'vertical')
// }

// var lapras = {
// 	pos: [448, 150],
// 	sprite: new Sprite('pokemon', 'img/pokemons/kanto/lapras.png', [0, 64], [0, 0], [32, 32], 2, [0, 1], 'vertical')
// }

var gameTime = 0;
var isGameOver;
var enemies = [];

// Speed in pixels per second
var playerSpeed = 100;
var enemySpeed = 100;

//var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
var rowTileCount = 18;   // The number of tiles in a row of our background
var colTileCount = 30;   // The number of tiles in a column of our background
var imageNumTiles = 8;  // The number of tiles per row in the tileset image

// Update game objects
function update(dt) {
    gameTime += dt;

};

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

// Draw everything
function render() {

  const tileGroup = generateTiles();
	for(var x = 0; x < tileGroup.length; x++) {
 		/*var layerType = pokelabMap.layers[layer].type;
 		if(layerType === "tilelayer") {
 			drawTilemap(ctx, pokelabMap.layers[layer].data, tilesetImage);
 		}

 		if(layerType === "objectgroup") {
 			drawObject(ctx, pokelabMap.layers[layer].objects, tilesetImage);
 		}*/

    var pokeImage = new Image();
    pokeImage.src = tileGroup[x].image;
    ctx.drawImage(pokeImage, 0, 0, 120, 120, (120 * x), (0), 120, 120);
 	}

 	ctx.save();
 	ctx.restore();
};

function reiniciaJogo() {
	$("#fim").remove();
	start();
}