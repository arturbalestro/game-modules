function start() { //Início da função Start
	$("#inicio").hide();

	$("#fundoGame").append("<div id='jogador'></div>");
	/*$("#fundoGame").append("<div class='pokemon animaPokeRight' style='top: 100px;'></div>");
	$("#fundoGame").append("<div class='pokemon animaPokeLeft' style='top: 150px;'></div>");
	$("#fundoGame").append("<div class='pokemon animaPokeTop' style='top: 200px;'></div>");*/

	//Principais variáveis do jogo
	var jogo = {}
	var velocidade = 5;
	var posicaoY = parseInt(Math.random() * 334);
	var fimdejogo = false;
	var stopMoving = false;

	var areaCounter = 0;
	var battleCounter = 0;
	var starterCounter = 0;
	var chosenPokemon = getRandomObject(pokemons);
	var pokeFront = setBattleImage(chosenPokemon.image, 'front');
	var pokeBack = setBattleImage(chosenPokemon.image, 'back');
	var pokeTeam = [];

	resources.load([
    'img/trainers/red.png',
    'img/trainers/profelm.png'
	]);
	resources.onReady(start);

	trainers.map(function(t) {
		if(t.name == "Red") {
			t.pokeTeam = pokeTeam;
			//console.log(t.pokeTeam);
			if(t.pokeTeam.length > 0) {
				//console.log(t.pokeTeam[0]);
				var firstMember = setBattleImage(t.pokeTeam[0].image, 'back');
			}else{
				var firstMember = {};
			}
		}
	});

	var TECLA = {
		W: 87,
		S: 83,
		A: 65,
		D: 68,
		E: 69
	}

	jogo.pressionou = [];

	//Verifica se o jogador pressionou alguma tecla
	$(document).keydown(function(e) {
		jogo.pressionou[e.which] = true;
	});

	$(document).keyup(function(e) {
		jogo.pressionou[e.which] = false;
		$("#jogador").removeClass("animaBottom");
		$("#jogador").removeClass("animaLeft");
		$("#jogador").removeClass("animaRight");
		$("#jogador").removeClass("animaTop");
	});

	jogo.timer = setInterval(loop,300);

	function getRandomObject(array) {
		var rand = parseInt(Math.random() * array.length - 1);

		for(var i = 0; i < array.length; i++) {
			if(i === rand) {
				return array[i];
			}
		}
	}

	function loop() {
		colisao();
		movejogador(30);
	}

	function movejogador(velocidade) {
		if(jogo.pressionou[TECLA.W]) {
			$("#jogador").removeClass("animaBottom");
			$("#jogador").removeClass("animaLeft");
			$("#jogador").removeClass("animaRight");
			$("#jogador").addClass("animaTop");

			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-velocidade);

			if(topo <= 0) {
				$("#jogador").css("top",topo+velocidade);				
			}

			var player = new Image();
			player.src = 'img/trainers/red.png';
			var yPos = (544 - tileSize * 2) - 32;
			ctx.drawImage(player, 0, 192, 48, 64, 448, yPos, 48, 64);
		}

		if(jogo.pressionou[TECLA.S]) {
			$("#jogador").removeClass("animaTop");
			$("#jogador").removeClass("animaLeft");
			$("#jogador").removeClass("animaRight");
			$("#jogador").addClass("animaBottom");
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+velocidade);

			if(topo >= 434) {
				$("#jogador").css("top",topo-velocidade);				
			}
		}

		if(jogo.pressionou[TECLA.A]) {
			$("#jogador").removeClass("animaTop");
			$("#jogador").removeClass("animaBottom");
			$("#jogador").removeClass("animaRight");
			$("#jogador").addClass("animaLeft");

			var lateral = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",lateral-velocidade);

			if(lateral <= 0) {
				$("#jogador").css("left",lateral+velocidade);				
			}
		}

		if(jogo.pressionou[TECLA.D]) {
			$("#jogador").removeClass("animaTop");
			$("#jogador").removeClass("animaBottom");
			$("#jogador").removeClass("animaLeft");
			$("#jogador").addClass("animaRight");

			var lateral = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",lateral+velocidade);

			if(lateral >= 694) {
				$("#jogador").css("left",lateral-velocidade);				
			}
		}

		if(jogo.pressionou[TECLA.E]) {
			//Atirar
			//disparo();
		}
	}

	function movebot() {
		if(stopMoving == false) {
			$(".anima").each(function() {
				posicaoX = parseInt($(this).css("left"));
				posicaoY = parseInt($(this).css("top"));
				//posicaoY = parseInt(Math.random() * 334);	

				$(this).css("left",posicaoX-10);
				$(this).css("top",posicaoY);

				if(posicaoX <= 0) {
					stopMoving = true;
					posicaoX = parseInt(Math.random() * 334);
					posicaoY = parseInt(Math.random() * 334);
					$(this).css("left",600);
					$(this).css("top",posicaoY);
				}
			});
		}
	}

	function stopMoving(personagem) {
		stopMoving = true;
		personagem.removeClass("animaBottom");
		personagem.removeClass("animaLeft");
		personagem.removeClass("animaRight");
		personagem.removeClass("animaTop");
	}

	function setBattleImage(src, direction) {
		src = src.replace("kanto", "kanto/"+direction);

		var image = {
			src: src,
			size: 0,
			width: 0,
			height: 0
		}

		$("body").append('<img class="decoyImage" src="'+src+'" />');
		$(".decoyImage").load(function() {
			image.width = $(".decoyImage").width() * 4;
			image.height = $(".decoyImage").height() * 4;

			//vertical
			if(image.width < image.height) {
				image.size = image.height;
			} else {
				//horizontal
				if(image.width > image.height) {
					image.size = image.width;
				}else{
					//square
					image.size = image.width;
				}
			}
		})

		return image;
	}

	function beginBattlePhase() {
		$(".home").hide();
		$(".battle").show();
		if(battleCounter === 0) {
			
			$(".battle").append("<div class='trainerBattle animaThrow'></div>");

			//if(firstMember != undefined) {
				setTimeout(function() {
					$(".trainerBattle").hide();
					$(".backArea").append("<div class='pokemonBattle back'></div>");
					$(".back").css({ 
						'background-image': 'url("'+pokeBack.src+'")',
						'background-size': pokeBack.size+'px', 
						'width': pokeBack.width+'px', 
						'height': pokeBack.height+'px'
					});		
				}, 1000);
			//}

			$(".frontArea").append("<div class='pokemonBattle front'></div>");
			$(".front").css({ 
				'background-image': 'url("'+pokeFront.src+'")', 
				'background-size': pokeFront.size+'px',
				'width': pokeFront.width+'px', 
				'height': pokeFront.height+'px'
			});

			battleCounter++;
		}
	}

	function setStarter(s) {
		$(".starterArea").show();

		pokemons.map(function(p) {
			if(p.name == s.title) {
				trainers.map(function(t) {
					if(t.name == "Red") {
						t.pokeTeam = pokeTeam;
						t.pokeTeam.push(p);
						console.log("You chose "+p.name+", the "+p.pokemonType+" pokémon!");
						console.log(t);
						$(".starterArea").hide();
					}
				});
			}
		});
	}

	function colisao() {
		var jogador = $("#jogador");
		var pokemonArea = $(".pokemonArea");
		var pokemon = $(".pokemonArea > .pokemon");
		var starter = $(".starter");
		var colisaoPokemon = (jogador.collision(pokemon));
		var colisaoArea = (jogador.collision(pokemonArea));
		var colisaoStarter = (jogador.collision(starter));

		if(colisaoPokemon.length > 0) {
			jogador.removeClass("running").addClass("paused");
			pokemon.removeClass("running").addClass("paused");

			posJogadorX = parseInt(jogador.css("left"));
			posAmigoX = parseInt(pokemon.css("left"));

			stopMoving = true;

			beginBattlePhase();

			//jogador.css("left",posJogadorX-10);
		}else{
			stopMoving = false;
			jogador.removeClass("paused").addClass("running");
			pokemon.removeClass("paused").addClass("running");
		}

		if(colisaoArea.length > 0) {
			if(areaCounter === 0) {
				pokemonArea.append("<div class='pokemon animaPokeBottom' id='"+chosenPokemon.entryNumber+"'></div>");
				$(".pokemonArea > .pokemon").css({ 'background-image': 'url("'+chosenPokemon.image+'")'});
				areaCounter++;
			}
		}else{
			pokemon.remove();
			areaCounter = 0;
		}

		if(colisaoStarter.length > 0) {
			if(areaCounter === 0) {
				setStarter(colisaoStarter[0]);
				areaCounter++;
			}
		}
	}

	var pokelab = document.getElementById('pokelab');
	var ctx = pokelab.getContext('2d');
	console.log("here's the json data: ", pokelabMap);

	var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
	var rowTileCount = 18;   // The number of tiles in a row of our background
	var colTileCount = 30;   // The number of tiles in a column of our background
	var imageNumTiles = 8;  // The number of tiles per row in the tileset image

	var tilesetImage = new Image();
	tilesetImage.src = pokelabMap.tilesets[0].image;
	$(tilesetImage).load(function() {
		for(var layer = 0; layer < pokelabMap.layers.length; layer++) {
			var layerType = pokelabMap.layers[layer].type;
			if(layerType === "tilelayer") {
				drawTilemap(ctx, pokelabMap.layers[layer].data);
			}

			if(layerType === "objectgroup") {
				drawObject(ctx, pokelabMap.layers[layer].objects);
			}
		}

		var player = new Image();
		player.src = 'img/trainers/red.png';
		$(player).load(function() {
			drawPlayer(ctx, player);
		});

		var npc = new Image();
		npc.src = 'img/trainers/profelm.png';
		$(npc).load(function() {
			drawNPC(ctx, npc);
		});
	});	

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
		console.log(layer);
		var tileClipX = (192 % 4) | 0;
    var tileClipY = (256 / 4) | 0; // Bitwise OR operation
		context.drawImage(layer, 0, 192, 48, 64, 448, 544 - (tileSize * 2), 48, 64);
	}

	function drawNPC(context, layer) {
		console.log(layer);
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