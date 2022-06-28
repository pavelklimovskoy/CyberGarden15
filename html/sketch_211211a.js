
let back= function(p) {
  p.img;
  p.canvas;

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight + 1000);
    p.background(0);
  }

  p.preload = function() {
    p.img = p.loadImage('pp.jpg');
  }

  p.N = 0;     
  p.NE = 1; 
  p.E = 2;     
  p.SE = 3; 
  p.S = 4;     
  p.SW = 5; 
  p.W = 6;      
  p.NW = 7; 

  p.direction;

  p.stepSize = 1.5;
  p.diameter = 0.5;

  p.posX, p.posY;

  p.setup = function() {
    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight + 1000);
    p.canvas.position(0,0);
    p.canvas.style("z-index", "-1");

    p.noStroke();
    
    p.background(0);

    p.posX = p.width / 2;
    p.posY = p.height / 2;
  }

  p.draw = function() {
    p.img.resize(p.width, p.height);
  
    for(let i = 0; i <= p.mouseX; i++) {
      p.direction = p.int(p.random(0, 8));
      p.diameter = p.random(1, 3);
      

      if(p.direction === p.N) {
        p.posY += p.stepSize;
      } else if(p.direction === p.NE) {
        p.posX += p.stepSize;
        p.posY += p.stepSize;
      } else if(p.direction === p.E) {
        p.posX += p.stepSize;
      } else if(p.direction === p.SE) {
        p.posX += p.stepSize;
        p.posY -= p.stepSize;
      } else if(p.direction === p.S) {
        p.posY -= p.stepSize;
      } else if(p.direction === p.SW) {
        p.posX -= p.stepSize;
        p.posY -= p.stepSize;
      } else if(p.direction === p.W) {
        p.posX -= p.stepSize;
      } else if(p.direction === p.NW) {
        p.posX -= p.stepSize;
        p.posY += p.stepSize;
      }

    
      if(p.posX > p.width)  p.posX = 0;
      if(p.posX < 0)      p.posX = p.width;
      if(p.posY < 0)      p.posY = p.height;
      if(p.posY > p.height) p.posY = 0;       
      
      
      p.col = p.img.get(p.posX + p.stepSize/2, p.posY + p.stepSize / 2)
      
      p.fill(p.red(p.col), p.green(p.col), p.blue(p.col), 300)
      p.ellipse(p.posX + p.stepSize*20 , p.posY + p.stepSize*20, p.random(45,60), p.random(45,60));
    
    }
  }
}

let randX = 1;
let randY = 1;
let randZ = 1;
let color = 1;
let count = 1;

let wallpaper = new p5(back);

let jsonRespons;

var bg;

// Нажатие на кнопку генерации
let generatedImage = false;
function generateContent()
{
  getReferat();

  randX = random(-50, 50);
  randY = random(-50, 50);
  randZ = random(-50, 50);
  color = random(0, 10);
  generatedImage = true;


  cx = random(0, 1000);
  cy = random(0, 1000);

  randWidth = random(1, 5);

  let text = document.getElementById("textArea").value;

  let picUrl;

  if(text != "") 
  {
    let pic = new XMLHttpRequest();
    pic.open("GET", "http://ab49-95-174-102-182.ngrok.io/img/" + text, true);
    pic.onload = function () {
      //jsonRespons = pic.response;
    
      console.log(pic.response);

      picUrl = "http://ab49-95-174-102-182.ngrok.io/" + pic.response;

      //document.getElementById("imageZone").src = picUrl

      bg =  loadImage(picUrl);

    };
    pic.send(null);
  }
}

let textOnPic = "1111";

function getReferat()
{
  let ref = new XMLHttpRequest();
  ref.open("GET", "http://ab49-95-174-102-182.ngrok.io/referat/", true);
  ref.onload = function () {
      //jsonRespons = pic.response;

      textOnPic = ref.response;

      console.log(textOnPic);
    };
    ref.send(null);
}

var myFont;

function preload(){
  bg = loadImage("https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/background.jpg");
  myFont = loadFont('Caveat-Regular.ttf');
  
}

let NUMSINES = 20; // how many of these things can we do at once?
let sines = new Array(31); // an array to hold all the current angles
let rad; // an initial radius value for the central sine
let i; // a counter variable

// play with these to get a sense of what's going on:
let fund = 0.005; // the speed of the central sine
let ratio = 1; // what multiplier for speed is each additional sine?
let alpha = 50; // how opaque is the tracing system

let trace = false; // are we tracing?

let cx = 0;
let cy = 0;

let randWidth = 1;


function setup() {
  canvas = createCanvas(1000, 1000, WEBGL);
  canvas.parent("holder");
}

let it = 0;
let rtx = 0;
let rty = 0;
function draw() {
  push();
  translate(0,  0);
  texture(bg);
  plane(1000, 1000);
  pop();

  textFont(myFont);
  textSize(90);
  text(textOnPic.toString(), rtx, rty);

  if(it % 5 == 0)
  {
    rtx = random(-600, 600);
    rty = random(-600, 600);
  }

  translate(-240, -100, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cylinder(70, 70);
  pop();

  translate(-240 * 2, 200, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cone(70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(70);
  pop();

  //translate(240, 0, 10);
  it++;
}

function Download()
{
  saveCanvas("image", "jpg");
}