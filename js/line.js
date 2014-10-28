var Line = function(_start)
{
  createjs.Shape.call(this);
  this.super = createjs.Shape.prototype;

  this.d = 100;
  this.r = Victor(this.d, 0);
  this.rotateRad = 0;
  this.start = Victor.fromObject(_start);
  this.end = this.start.clone().add(this.r);

  this.g = this.graphics.setStrokeStyle(5, 'round').beginStroke('#ff0');
  this.update();
};
Line.prototype = new createjs.Shape

Line.prototype.update = function()
{
  this.r.x = this.d;
  var p = this.r.clone().rotate(this.rotateRad);
  this.end = this.start.clone().add(p);

  this.graphics.clear();
  var g = this.graphics.setStrokeStyle(2, 'round').beginStroke('#ff0');
  g.moveTo(this.start.x, this.start.y);
  g.lineTo(this.end.x, this.end.y);
};

Line.prototype.rotate = function(cw)
{
  if(cw)
    this.rotateRad += Math.PI / 60;
  else
    this.rotateRad -= Math.PI / 60;
}

Line.prototype.long = function()
{
  this.d += 10;
}

Line.prototype.short = function()
{
  this.d -= 10;
  if(this.d < 0) this.d = 0;
}