var canvas = null;
var stage = null;

var sides = [];
var line = null;
var cpObj = new createjs.Shape();

var txt;

function init()
{
  canvas = document.getElementById('test');
  stage = new createjs.Stage(canvas);

  for(var i = 0; i < SIDES.length; i++)
  {
    var side = new Side(SIDES[i].start, SIDES[i].end);
    sides.push(side);
    stage.addChild(side);
  }

  line = new Line({x:300, y:100});
  stage.addChild(line);

  cpObj.alpha = 0;
  cpObj.graphics.beginFill('#fff').drawCircle(0, 0, 5);
  stage.addChild(cpObj);

  drawExplanation();

  document.onkeypress = keyPressed;

  createjs.Ticker.on("tick", update);
  createjs.Ticker.setFPS(60);
}

function update(event)
{
  stage.update();
  line.update();

  var cps = [];
  var distances = [];

  cpObj.alpha = 0;
  for(var i = 0; i < sides.length; i++)
  {
    var result = sides[i].crossing(line.start, line.end);
    if(result != false)
    {
      cps.push(result.point);
      distances.push(result.distance);
    }
    sides[i].update();
  }

  if(cps.length != 0)
  {
    // 複数の交差点の中から、最も近かったところを選択
    var mindist = Math.min.apply(null, distances);
    var index = distances.indexOf(mindist);
    var nearestCP = cps[index];

    cpObj.alpha = 1.0;
    cpObj.x = nearestCP.x;
    cpObj.y = nearestCP.y;
  }
}

function drawExplanation()
{
  txt = new createjs.Text('', '12px Arial', '#0f0');
  txt.text =  "r: rotate CW\n";
  txt.text += "R: rotate CCW\n";
  txt.text += "l: make line longer\n";
  txt.text += "s: make line shorter";

  txt.x = 500;
  txt.y = 20;
  stage.addChild(txt); 
}

function keyPressed(event)
{
  switch(event.keyCode)
  {
    case KEYCODE_r:
      line.rotate(true);
      break;
    case KEYCODE_R:
      line.rotate(false);
      break;
    case KEYCODE_l:
      line.long();
      break;
    case KEYCODE_s:
      line.short();
      break;
    default:
      console.log("undefined input:" + event.keyCode);
      break;
    }
}

var SIDES = [
  {
    start: {x: 100, y:100},
    end:   {x: 200, y:300}
  },
  {
    start: {x: 300, y:300},
    end:   {x: 400, y:100}
  },
  {
    start: {x: 400, y:400},
    end:   {x: 100, y:400}
  }
];

var  KEYCODE_r = 114;
var  KEYCODE_R = 82;
var  KEYCODE_l = 108;
var  KEYCODE_s = 115;

window.onload = init;
