(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();

var keys = {
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	E: 69
}

var pressed = [];
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

function moveSprite(player, context, speed) {
	if(pressed[keys.W]) {
		$("#jogador").removeClass("animaBottom");
		$("#jogador").removeClass("animaLeft");
		$("#jogador").removeClass("animaRight");
		$("#jogador").addClass("animaTop");

		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-speed);

		if(topo <= 0) {
			$("#jogador").css("top",topo+speed);				
		}

		player.pos[1] -= speed;
		//player.sprite.render(1000);
		//debugger;
		context.drawImage(resources.get(player.sprite.url),
                player.sprite.bgpos[0], player.sprite.bgpos[1],
                player.sprite.size[0], player.sprite.size[1],
                player.pos[0], player.pos[1],
                player.sprite.size[0], player.sprite.size[1]);
	}

	if(pressed[keys.S]) {
		$("#jogador").removeClass("animaTop");
		$("#jogador").removeClass("animaLeft");
		$("#jogador").removeClass("animaRight");
		$("#jogador").addClass("animaBottom");
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+speed);

		if(topo >= 434) {
			$("#jogador").css("top",topo-speed);				
		}
	}

	if(pressed[keys.A]) {
		$("#jogador").removeClass("animaTop");
		$("#jogador").removeClass("animaBottom");
		$("#jogador").removeClass("animaRight");
		$("#jogador").addClass("animaLeft");

		var lateral = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",lateral-speed);

		if(lateral <= 0) {
			$("#jogador").css("left",lateral+speed);				
		}
	}

	if(pressed[keys.D]) {
		$("#jogador").removeClass("animaTop");
		$("#jogador").removeClass("animaBottom");
		$("#jogador").removeClass("animaLeft");
		$("#jogador").addClass("animaRight");

		var lateral = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",lateral+speed);

		if(lateral >= 694) {
			$("#jogador").css("left",lateral-speed);				
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