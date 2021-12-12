
let back= function(p) {
  p.img;
  p.canvas;

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight + 1000);
    p.background(0);
  }

  p.preload = function() {
    p.img = p.loadImage('./static/pp.jpg');
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

  randX = random(-50, 50);
  randY = random(-50, 50);
  randZ = random(-50, 50);
  color = random(0, 10);
  generatedImage = true;



  let text = document.getElementById("textArea").value;

  let picUrl;

  if(text != "")
  {
    let pic = new XMLHttpRequest();
    pic.open("GET", "http://b77c-95-174-102-182.ngrok.io/img/" + text, true);
    pic.onload = function () {
      //jsonRespons = pic.response;

      console.log(pic.response);

      picUrl = "http://b77c-95-174-102-182.ngrok.io/" + pic.response;

      //document.getElementById("imageZone").src = picUrl

      bg =  loadImage(picUrl);

      generatedImage = true;

    };
    pic.send(null);
  }
}

let textOnPic = "";

function getReferat()
{
  let ref = new XMLHttpRequest();
  ref.open("GET", "http://b77c-95-174-102-182.ngrok.io/referat/", true);
  ref.onload = function () {
      //jsonRespons = pic.response;

      console.log(ref.response);

      textOnPic = "http://b77c-95-174-102-182.ngrok.io/" + ref.response;
    };
    ref.send(null);
}

function preload(){
  bg = loadImage("https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/background.jpg")
}

let NUMSINES = 20; // how many of these things can we do at once?
let sines = new Array(NUMSINES); // an array to hold all the current angles
let rad; // an initial radius value for the central sine
let i; // a counter variable

// play with these to get a sense of what's going on:
let fund = 0.005; // the speed of the central sine
let ratio = 1; // what multiplier for speed is each additional sine?
let alpha = 50; // how opaque is the tracing system

let trace = false; // are we tracing?

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.parent('holder');

  rad = height / 4; // compute radius for central circle
  background(bg); // clear the screen

  for (let i = 0; i<sines.length; i++) {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }
}

function draw() {

  if(!generatedImage)
  {
    clear();
  }
  else
  {
    if (!trace) {
      background(bg); // clear screen if showing geometry
      stroke(0, 255); // black pen
      noFill(); // don't fill
    }

    // MAIN ACTION
    push(); // start a transformation matrix
    translate(width / 2, height / 2); // move to middle of screen

    for (let i = 0; i < sines.length; i++) {
      let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
      // setup for tracing
      if (trace) {
        stroke(0, 0, 255 * (float(i) / sines.length), alpha); // blue
        fill(0, 0, 255, alpha / 2); // also, um, blue
        erad = 5.0 * (1.0 - float(i) / sines.length); // pen width will be related to which sine
      }
      let radius = rad / (i + 1); // radius for circle itself
      rotate(sines[i]); // rotate circle
      if (!trace) ellipse(0, 0, radius * 2, radius * 2); // if we're simulating, draw the sine
      push(); // go up one level
      translate(0, radius); // move to sine edge
      if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
      if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
      pop(); // go down one level
      translate(0, radius); // move into position for next sine
      sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; // update angle based on fundamental
    }

    pop(); // pop down final transformation

  }
  }



function keyReleased() {
  if (key==' ') {
    trace = !trace;
    background(255);
  }
}
