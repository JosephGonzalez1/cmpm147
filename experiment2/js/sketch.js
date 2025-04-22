// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}
/* exported setup, draw */
let seed = 0;

const iceColor = "#cfe9f5";
const skyTopColor = "#ff5200";     // Orange-red
const skyMidColor = "#a12c8e";     // Deep purple
const skyBottomColor = "#24002a";  // Dark purple
const mountainColor = "#2f2f2f";
const waterReflection = "#7e3f7e"; // Muted purple

function setup() {
  createCanvas(400, 200);
  createButton("reimagine").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);
  noStroke();

  // Sky Gradient (3-color blend: orange to purple to dark)
  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c;
    if (inter < 0.5) {
      c = lerpColor(color(skyTopColor), color(skyMidColor), inter * 2);
    } else {
      c = lerpColor(color(skyMidColor), color(skyBottomColor), (inter - 0.5) * 2);
    }
    stroke(c);
    line(0, y, width, y);
  }

  // Mountains
  fill(mountainColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    let x = (width * i) / steps;
    let y = height / 2 - pow(random(), 1.5) * height / 2.5 - height / 20;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  // Ice foreground
  fill(iceColor);
  rect(0, height / 2, width, height / 2);

  // Reflective water patches with purple tint
  for (let i = 0; i < 5; i++) {
    let purp = color(waterReflection);
    purp.setAlpha(150);
    fill(purp);
    let x = random(width);
    let y = random(height / 2, height);
    let w = random(40, 100);
    let h = random(5, 20);
    ellipse(x, y, w, h);
  }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}
