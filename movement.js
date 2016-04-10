key = {
  right: false,
  left: false,
  up: false,
  down: false
};

function move(player, yPos, right, left, up, down) {
  player.faceRight = right;
  player.faceLeft = left;
  player.faceUp = up;
  player.faceDown = down;
  if (player.counter === player.endStep) {
    player.sx = 0;
    player.counter = 0;
    player.nextStep = player.step;
  } else if (player.counter === player.nextStep) { 
    if (player.sy === yPos) {
      player.sx += player.w;
    }
    player.sy = yPos;
    player.nextStep += player.step;
  }
  player.counter += 1;
}

function reset(player) {
  //player.sy = player.start.y;
  player.counter = 0;
  player.nextStep = 0;
}

function setDirections(player, direction) {
  if (key.right === true) {
    move(player.h * 2, true, false);
    player.x += 1;
    if (player.sx > player.w * 3) {
      player.sx = 0;
    }
  }
  if (key.left === true) {
    move(player.h, false, true);
    player.x -= 1;
  }

  if (key.up === true) {
    move(player.h * 3, false, false, true, false);
    player.y -= 1;
  }
  if (key.down === true) {
    move(0, false, false, false, true);
    player.y += 1;
  }

  if (key.right === false && player.faceRight === true || direction == 'right') {
    player.sx = player.start.rightX;
    player.sy = player.start.rightY;
    reset(player);
  }
  if (key.left === false && player.faceLeft === true || direction == 'left') {
    player.sx = player.start.leftX;
    player.sy = player.start.leftY;
    reset(player);
  }
  if (key.up === false && player.faceUp === true || direction == 'up') {
    player.sx = player.start.upX;
    player.sy = player.start.upY;
    reset(player);
  }
  if (key.down === false && player.faceDown === true || direction == 'down') {
    player.sx = player.start.downX;
    player.sy = player.start.downY;
    reset(player);
  }
}

function keyDown(e) {
  if (e.keyCode === 39) {
    key.right = true;
  } else if (e.keyCode === 37) {
      key.left = true;
    } else if(e.keyCode === 38){
        key.up = true;
      } else if(e.keyCode === 40){
        key.down = true;
      }
}

function keyUp(e) {
  if (e.keyCode === 39) {
    key.right = false;
  } else if (e.keyCode === 37) {
    key.left = false;
  } else if(e.keyCode === 38){
      key.up = false;
    } else if(e.keyCode === 40){
      key.down = false;
    }
}