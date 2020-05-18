var circleArray = []
var colorArray = [
    {
        r: '150',
        g: '100',
        b: '200'
    },
    {
        r: '100',
        g: '100',
        b: '255'
    },
    {
        r: '0',
        g: '50',
        b: '150'
    },
    {
        r: '0',
        g: '70',
        b: '189'
    },
    {
        r: '0',
        g: '130',
        b: '211'
    }
]
var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 50;



var canvas = document.querySelector('canvas');
var body  = document.querySelector('body');
var menu = document.getElementById('menu');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');

c.globalCompositeOperation = "lighten";

window.addEventListener(`mousemove`, event => {
  mouse.x = event.x;
  mouse.y = event.y;
}, false);

window.addEventListener(`resize`, event => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}, false);

function Circle(center, radius, color, angle,lineWidth, speed){
  this.center = center;
  this.radius = radius;
  this.color = color;
  this.angle = angle;
  this.lineWidth = lineWidth;
  this.speed = speed;

  var x1 = this.center.x + this.radius * Math.cos(this.angle);
  var y1 = this.center.y + this.radius * Math.sin(this.angle);
  var x2 = this.center.x + this.radius * Math.cos(this.angle + Math.PI);
  var y2 = this.center.y + this.radius * Math.sin(this.angle + Math.PI);

  var gradient = c.createLinearGradient(x1,y1,x2,y2);

  this.draw = function(){
    x1 = this.center.x + this.radius * Math.cos(this.angle);
    y1 = this.center.y + this.radius * Math.sin(this.angle);
    x2 = this.center.x + this.radius * Math.cos(this.angle + Math.PI);
    y2 = this.center.y + this.radius * Math.sin(this.angle + Math.PI);
    
    gradient = c.createLinearGradient(x1,y1,x2,y2);
    gradient.addColorStop(0, 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',0)');
    gradient.addColorStop(1, 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',1)');
    c.beginPath();
    c.arc(this.center.x, this.center.y, this.radius, this.angle, this.angle + Math.PI);
    c.strokeStyle = gradient;
    c.lineWidth = this.lineWidth;

    c.stroke();
  }

  this.update = function(){
      this.angle += speed;
  }

  
}

function init(){
  circleArray = [];
  var res = Math.floor(innerWidth / 50);
  for (var i = 0; i < res; i++) {
    var radius = 0;

    if(innerWidth > innerHeight){
      radius = Math.random()*innerWidth*0.25  + menu.offsetWidth*0.7;
    }else{
      radius = Math.random()*innerHeight*0.25 + menu.offsetWidth*0.7;
    }
    
    var x = innerWidth/2;
    var y = innerHeight/2;
    var center = { "x": x, "y": y };
    var color = colorArray[Math.floor(Math.random()*colorArray.length)]
    var angle = Math.random()*Math.PI*2;
    var lineWidth = Math.random()*8 + 3;
    var speed = Math.random() * 0.03 + 0.01;
    circleArray.push(new Circle(center, radius, color, angle, lineWidth, speed))
  }
}

var color = {
  r: 9,
  g: 16,
  b: 48
}
var blue = 48;
var time = 0;
function animate(){
  
  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    time += 0.0005;
    blue = Math.sin(time) * 40 + 70;

    canvas.style.background = "rgb(9, 16,"+blue.toString()+")";
    circleArray[i].draw();
    circleArray[i].update();
  }
  
  requestAnimationFrame(animate);
}

init();
animate();


