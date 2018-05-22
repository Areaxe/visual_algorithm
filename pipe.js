function Pipe(ctx,{ height, y, x, color }){
  this.height = height;
  this.x = x || 0;
  this.y = y || height;
  this.realY = this.y;
  this.color = color;
  this.ctx = ctx;
  this.isFocus = false;
}

Pipe.prototype.render = function(){
  let ctx = this.ctx;
  ctx.beginPath();
  ctx.rect(this.x,this.realY,30,this.height);
  ctx.fillText(this.height,this.x+10,this.realY - 50)
  ctx.fillStyle = this.color;
  ctx.fill();
  if(this.isFocus){
    ctx.stroke();
  }
  ctx.closePath();
}

Pipe.prototype.focus = function(){
  this.isFocus = true;
}
Pipe.prototype.unfocus = function(){
  this.isFocus = false;
}
Pipe.prototype.moveout = function(){
  this.realY = this.y + this.height + 50;
}

Pipe.prototype.movein = function(){
  this.realY = this.y;
}
