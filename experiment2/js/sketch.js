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

let seed = 239;

// Colors sampled from the inspiring image
const skyTopColor = "#f76c2f";       // Orange-pink
const skyBottomColor = "#432140";    // Deep purple
const mountainColor = "#2b2e3b";     // Shadowy mountain
const iceColor = "#b6cdd8";          // Frozen lake surface
const waterReflection = "#7b4566";   // Warm reflection in water
const treeColor = "#1c1e1b";         // Dark trees

function setup() {
  createCanvas(400, 200);
  createButton("reimagine").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);
  noStroke();

  // --- Sky Gradient
  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c = lerpColor(color(skyTopColor), color(skyBottomColor), inter);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();

  // --- Mountain
  fill(mountainColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - pow(random(), 1.5) * height / 2.5 - height / 20;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  // --- Ice foreground
  fill(iceColor);
  rect(0, height / 2, width, height / 2);

  // --- Reflective water patches
  for (let i = 0; i < 6; i++) {
    let c = color(waterReflection);
    c.setAlpha(160);
    fill(c);
    let x = random(width);
    let y = random(height / 2, height);
    let w = random(40, 100);
    let h = random(5, 20);
    ellipse(x, y, w, h);
  }

  // --- Trees: animated as if passing by in a train
  fill(treeColor);
  let numTrees = 20;
  let scrub = mouseX / width;
  for (let i = 0; i < numTrees; i++) {
    let z = random(0.3, 1); // scale for depth
    let speed = (scrub / 100 + millis() / 30000) / z;
    let x = width * ((random() + speed) % 1);
    let s = width / 40 / z;
    let y = height / 2 + height / 25 / z;
    triangle(x, y - s, x - s / 2, y, x + s / 2, y);
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
