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

	trainers.map(function(t) {
		if(t.name == "Red") {
			t.pokeTeam = pokeTeam;
			console.log(t.pokeTeam);
			if(t.pokeTeam.length > 0) {
				console.log(t.pokeTeam[0]);
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

	var pokelab = document.getElementById('pokelab').getContext('2d');
	console.log("here's the canvas data: ", pokelab);
	console.log("here's the json data: ", pokelabMap);

	var tileSize = pokelabMap.tilewidth;       // The size of a tile (32×32)
	var rowTileCount = 24;   // The number of tiles in a row of our background
	var colTileCount = 40;   // The number of tiles in a column of our background
	var imageNumTiles = 16;  // The number of tiles per row in the tileset image

	var tilesetImage = new Image();
	tilesetImage.src = pokelabMap.tilesets[0].image;
	$(tilesetImage).load(function() {
		drawTilemap(pokelab, pokelabMap.layers[0].data);
	});

	function drawTilemap(context, layer) {
		 context.drawImage(tilesetImage, 87, 140, tileSize, tileSize, 250, 50, tileSize, tileSize);
	   /*for (var r = 0; r < rowTileCount; r++) {
	      for (var c = 0; c < colTileCount; c++) {
	        var tile = layer[ r ][ c ];
	        // Steps 2 and 3
	        var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
					var tileCol = (tile % imageNumTiles) | 0;
					context.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
	      }
	   }*/
	}
} //Fim da função Start

function reiniciaJogo() {
	$("#fim").remove();
	start();
}