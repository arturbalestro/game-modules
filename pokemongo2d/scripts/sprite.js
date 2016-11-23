function Sprite(url, bgpos, pos, size, speed, frames, dir, once) {
  this.bgpos = bgpos;
  this.pos = pos;
  this.size = size;
  this.speed = typeof speed === 'number' ? speed : 0;
  this.frames = frames;
  this._index = 0;
  this.url = url;
  this.dir = dir || 'horizontal';
  this.once = once;
};

Sprite.prototype.update = function(dt) {
  this._index += this.speed*dt;
}

Sprite.prototype.render = function(ctx) {
  var frame;

  if(this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if(this.once && idx >= max) {
          this.done = true;
          return;
      }
  }
  else {
      frame = 0;
  }

  var x = this.bgpos[0];
  var y = this.bgpos[1];

  if(this.dir == 'vertical') {
      y += frame * this.size[1];
  }
  else {
      x += frame * this.size[0];
  }

  ctx.drawImage(resources.get(this.url),
                x, y,
                this.size[0], this.size[1],
                this.pos[0], this.pos[1],
                this.size[0], this.size[1]);
}

var player = {
  pos: [448, 480],
  sprite: new Sprite('img/trainers/red.png', [0, 192], [448, 480], [48, 64], 4, [0, 1, 2, 3])
};