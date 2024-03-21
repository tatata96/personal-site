let font;
let font2;
let points = [];

let x = 110,
  y;

const light = "rgb(255, 251, 238)";
const dark = "black";

let bgcolor = light;

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

const colorsStandard = [
  "#f00204",
  "#f3ce00",
  "#bfa2f4",
  "#f35c01",
  "#009801",
  "#0333dc",
  "#87daf3",
  "#f494d3",
];

const colors = [
  "#f00204",
  "#f00204",
  "#f00204",
  "#f00204",
  "#f3ce00",
  "#f3ce00",
  "#f3ce00",
  "#f3ce00",
  "#bfa2f4",
  "#bfa2f4",
  "#bfa2f4",
  "#bfa2f4",
  "#f35c01",
  "#f35c01",
  "#f35c01",
  "#f35c01",
  "#009801",
  "#009801",
  "#009801",
  "#009801",
  "#0333dc",
  "#0333dc",
  "#0333dc",
  "#0333dc",
  "#87daf3",
  "#87daf3",
  "#87daf3",
  "#87daf3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
  "#f494d3",
];

// Sliders variable
let radius, wave, size, num, speed;
let y0 = 60;

// Oscillation variable
let angle = 0;

// let numSliderMin = 1;
// let sizeliderMin = 4;

let crazyMode = false;

let r = 5;

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

  const links = document.querySelectorAll(".link-row p");

  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      bgcolor = dark;
    });

    link.addEventListener("mouseout", () => {
      bgcolor = light;
    });
  });
  // const canvas = document.querySelectorAll("canvas")[0];

  // canvas.addEventListener("mouseover", () => {
  //   document.body.style.pointerEvents = "auto";

  //   crazyMode = true;
  //   r = 10;
  //   document.body.style.backgroundColor = dark;

  //   // bgcolor = dark;
  // });

  // canvas.addEventListener("mouseout", () => {
  //   document.body.style.pointerEvents = "none";
  //   // document.body.style.backgroundColor = light;

  //   r = 5;
  //   crazyMode = false;
  //   // bgcolor = light;
  // });
}

let colorIndex = 0;

function draw() {
  background(bgcolor);
  fill(0);
  textFont(font2);

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
  colorIndex = (colorIndex + 1) % colors.length;
}

function createDancingLetters(points, r, w, s) {
  for (let i = 0; i < points.length; i++) {
    let offsetX = r * cos(angle + i * w) - 100; // Calculate the dynamic offset in the x-direction
    let ellipseX = points[i].x + offsetX; // Add the offset to the original x-coordinate and apply additional offset
    let ellipseY = points[i].y; // Keep the y-coordinate unchanged
    noStroke();

    stroke("black");
    strokeWeight(3);

    if (crazyMode) {
      console.log("crazzyy");
      fillCrazyMode(i);
    } else {
      fillStandardMode(i);
    }

    ellipse(ellipseX, ellipseY, s, s);
  }
}

function fillStandardMode(i) {
  fill(colorsStandard[i % colorsStandard.length]);
}

function fillCrazyMode(i) {
  fill(colors[(colorIndex + i) % colors.length]);
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
