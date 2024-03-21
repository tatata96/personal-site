let font;
let font2;
let points = [];

let x = 110,
  y;

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

const colors = [
  "#f00204",
  "#f3ce00",
  "#bfa2f4",
  "#f35c01",
  "#009801",
  "#0333dc",
  "#87daf3",
  "#f494d3",
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
  createCanvas(document.body.clientWidth, windowHeight / 5);
  fontSize = min(windowWidth / 10, 230);

  y = windowWidth / 12;

  angleMode(DEGREES);

  textFont(fontSize);
}

function draw() {
  background(255, 251, 238);
  fill(0);
  textFont(font2);

  let r = 5;
  let w = 17;
  let s = map(mouseX, 0, width, 10, 20);
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

    stroke("black");
    strokeWeight(3);

    fill(colors[i % colors.length]);
    ellipse(ellipseX, ellipseY, s, s);
  }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, windowHeight / 5.5);

  // if (windowWidth < 600) {
  //   num.value(107);
  //   size.value(10)
  // }
  y = windowHeight / 6 / 1.1;

  fontSize = min(windowWidth / 10, 230);
}
