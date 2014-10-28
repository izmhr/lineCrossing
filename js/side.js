var Side = function(_start, _end)
{
  createjs.Shape.call(this);
  this.super = createjs.Shape.prototype;

  this.color = '#FFF';

  this.start = Victor.fromObject(_start);
  this.end = Victor.fromObject(_end);

  this.update();
};
Side.prototype = new createjs.Shape;

Side.prototype.crossing = function(_start, _end)
{
  // http://marupeke296.com/COL_2D_No10_SegmentAndSegment.html

  var v = this.start.clone().subtract(_start);
  var v1 = _end.clone().subtract(_start);
  var v2 = this.end.clone().subtract(this.start);

  if(v1.cross(v2) == 0) return false;

  var t2 = v.cross(v1) / v1.cross(v2);
  var t1 = v.cross(v2) / v1.cross(v2);

  if( 0 <= t2 && t2 <= 1 && 0 <= t1 && t1 <= 1)
  {
    // crossing point
    var cp = _start.clone().add(v1.scalarMultiply(t1));
    this.color = '#f33';
    return {point: cp, distance: t1};
  }
  else
  {
    this.color = '#fff';
    return false;
  }
}

Side.prototype.update = function()
{
  this.graphics.clear();
  var g = this.graphics.setStrokeStyle(2, 'round').beginStroke(this.color);
  g.moveTo(this.start.x, this.start.y);
  g.lineTo(this.end.x,   this.end.y);
};
