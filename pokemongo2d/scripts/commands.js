var keys = {
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	E: 69
}

pressed = [];
//Verifica se o jogador pressionou alguma tecla
$(document).keydown(function(e) {
	pressed[e.which] = true;
});

$(document).keyup(function(e) {
	pressed[e.which] = false;
	$("#jogador").removeClass("animaBottom");
	$("#jogador").removeClass("animaLeft");
	$("#jogador").removeClass("animaRight");
	$("#jogador").removeClass("animaTop");
});

function movejogador(velocidade) {
	if(pressed[keys.W]) {
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

	if(pressed[keys.S]) {
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

	if(pressed[keys.A]) {
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

	if(pressed[keys.D]) {
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

	if(pressed[keys.E]) {
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