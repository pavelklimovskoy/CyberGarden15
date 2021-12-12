
let back= function(p) {
  p.img;
  p.canvas;

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
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
    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
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

  // if(text != "") 
  // {
  //   let req = new XMLHttpRequest();
  //   req.open("GET", "https://0aea-95-174-102-182.ngrok.io/img/" + text, true);
  //   req.responseType = "json";
  //   req.onload = function () {
  //     jsonRespons = req.response;
    
  //     console.log(req.response);

  //     generatedImage = true;

  //   };
  //   req.send(null);
  // }
  

}



function setup() {
  canvas = createCanvas(710, 400, WEBGL);
  canvas.parent("loadCont");
}

function draw() {
  clear();

  if(generatedImage == true)
  {
    ambientLight(200);
    ambientMaterial(70, 130, 230);

    translate(-240, -100, 0);
    

    translate(240, 0, 0);
    push();
    rotateZ(randZ * PI / 180);
    rotateX(randX * PI / 180);
    rotateY(randY * PI / 180);
    box(70, 70, 70);
    pop();
  }  
}

