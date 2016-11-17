var pokeTeam = [];
var chosenPokemon = getRandomObject(pokemons);
var pokeFront = setBattleImage(chosenPokemon.image, 'front');
var pokeBack = setBattleImage(chosenPokemon.image, 'back');

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

function getRandomObject(array) {
	var rand = parseInt(Math.random() * array.length - 1);

	for(var i = 0; i < array.length; i++) {
		if(i === rand) {
			return array[i];
		}
	}
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