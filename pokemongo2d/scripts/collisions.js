var areaCounter = 0;
var battleCounter = 0;
var starterCounter = 0;

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