let font;
let font2;
let points = [];
let msgInput;
let x = 110,
  y = 120;

let sizeSliderMin, sizeSliderMax;

let alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Sliders variable
let radius, wave, size, num, speed;
let y0 = 60;

// Oscillation variable
let angle = 0;

// let numSliderMin = 1;
// let sizeliderMin = 4;

function preload() {
  font = loadFont("fonts/Roboto-Regular.ttf");
  font2 = loadFont("fonts/BebasNeue-Regular.ttf");
}

function setup() {
  // createCanvas(windowWidth , windowHeight / 3);
  createCanvas(document.body.clientWidth, windowHeight / 3);

  angleMode(DEGREES);

  fontSize = min(windowWidth / 10, 230); // Adjust the font size based on the new canvas width
  textFont(fontSize);
}


function logSliderValue(slider, name) {
  console.log(`${name}: ${slider.value()}`);
}

function draw() {
  background(255);
  fill(0);
  textFont(font2);

  let r = 5;
  let w = 11;
  let s = map(mouseX, 0, width, 10, 30);
  let n = 10 * 0.01;
  let sp = map(mouseY, 0, height, 1, 5);

  if (windowWidth < 600) {
    let hello = "Hello";
    let stranger = "Stranger";
    let m = hello.toUpperCase();
    let m2 = stranger.toUpperCase();

    y = 60;

    let helloPoints = font.textToPoints(m, x, y, fontSize, {
      sampleFactor: n,
    });

    let strangerPoints = font.textToPoints(m2, x, y + 80, fontSize, {
      sampleFactor: n,
    });

    createDancingLetters(helloPoints, r, w, s);
    createDancingLetters(strangerPoints, r, w, s);
  } else {
    let wholeText = "Hello Stranger".toUpperCase();

    let wholeTextPoints = font.textToPoints(wholeText, x, y, fontSize, {
      sampleFactor: n,
    });

    createDancingLetters(wholeTextPoints, r, w, s);
  }

  angle += sp;
}

function createDancingLetters(points, r, w, s) {
  for (let i = 0; i < points.length; i++) {
    let offsetX = r * cos(angle + i * w) - 100; // Calculate the dynamic offset in the x-direction
    let ellipseX = points[i].x + offsetX; // Add the offset to the original x-coordinate and apply additional offset
    let ellipseY = points[i].y; // Keep the y-coordinate unchanged
    noStroke();
    fill("#FBD770");
    ellipse(ellipseX, ellipseY, s, s);
    fill("#FFF502");
    ellipse(ellipseX, ellipseY, s / 2, s / 2);
  }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, windowHeight / 3);

  // if (windowWidth < 600) {
  //   num.value(107);
  //   size.value(10)
  // }

  fontSize = min(windowWidth / 10, 230);
}
