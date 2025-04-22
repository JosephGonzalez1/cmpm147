// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
/* exported setup, draw */

let seed = 239;

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
