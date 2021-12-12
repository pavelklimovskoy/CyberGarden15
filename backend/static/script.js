var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums =200;
var noiseScale = 800;
var canvas;

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0)
	canvas.style('z-index','-1');
    canvas.background(21, 8, 50);
	for(var i = 0; i < nums; i++){
		particles_a[i] = new Particle(random(0, width),random(0,height));
		particles_b[i] = new Particle(random(0, width),random(0,height));
		particles_c[i] = new Particle(random(0, width),random(0,height));
	}
}

function draw(){
    
	noStroke();
	smooth();
		for(var i = 0; i < nums; i++){
		var radius = map(i,0,nums,1,2);
		var alpha = map(i,0,nums,0,250);

		fill(69,33,124,alpha);
		particles_a[i].move();
		particles_a[i].display(radius);
		particles_a[i].checkEdge();

		fill(7,153,242,alpha);
		particles_b[i].move();
		particles_b[i].display(radius);
		particles_b[i].checkEdge();

		fill(255,255,255,alpha);
		particles_c[i].move();
		particles_c[i].display(radius);
		particles_c[i].checkEdge();
	}  
}


function Particle(x, y){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.speed = 0.4;

	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}

function isEnterPressed(e){
var keycode=null;
if (e!=null){
    if (window.event!=undefined){
        if (window.event.keyCode) keycode = window.event.keyCode;
        else if (window.event.charCode) keycode = window.event.charCode;
    }else{
        keycode = e.keyCode;
    }
}
return (keycode == 13);}

function rndInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
  
var s2 = function( sketch ) {
    sketch.setup = function(){
        var canvas2 = sketch.createCanvas(100, 100, sketch.WEBGL);
        sketch.rotateX(rndInt(0,90));
        sketch.rotateY(rndInt(0,90));
    }
    sketch.draw = function(){
        
        sketch.box(50);
    }
};

var k = 0;

function OnMouseClick() {
    k++;
    if (k>1){
        document.getElementById("defaultCanvas1").remove();
    }

	let str = document.getElementById("textZone").value;

	let pic = new XMLHttpRequest();
    pic.open("GET", "http://127.0.0.1/img/" + str, true);
    pic.onload = function ()
    {
		console.log(pic.responseText);

		document.getElementById("imageZone").src = "./" + pic.responseText;
    }
    pic.send(null);

    var newp = new p5(s2);
}