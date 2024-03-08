let font;
let font2;
let points = [];
let msgInput;
let x = 150,
  y = 270;

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

function preload() {
  font = loadFont("fonts/Roboto-Regular.ttf");
  font2 = loadFont("fonts/BebasNeue-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, 400);
  angleMode(DEGREES);
  gui();

  fontSize = min(windowWidth / 10, 270);
  textFont(fontSize);
}

function gui() {
  fill("blue");

  let slidersX = windowWidth - 130; // Adjust the X position of sliders
  let slidersY = windowHeight - 200; // Adjust the Y position of sliders

  radius = createSlider(5, 30, 5); // Set default value for radius slider to 5
  radius.position(slidersX, slidersY);
  radius.size(100);
  radius.addClass("sliders");
  radius.input(() => logSliderValue(radius, "RADIUS")); // Attach input event listener

  wave = createSlider(10, 30, 25);
  wave.position(slidersX, slidersY + 20);
  wave.size(100);
  wave.addClass("sliders");
  wave.input(() => logSliderValue(wave, "WAVE"));

  size = createSlider(1, 30, 24); // Set default value for size slider to 24
  size.position(slidersX, slidersY + 40);
  size.size(100);
  size.addClass("sliders");
  size.input(() => logSliderValue(size, "SIZE"));

  num = createSlider(4, 20, 8); // Set minimum value for num slider to 4 and default value to 8
  num.position(slidersX, slidersY + 60);
  num.size(100);
  num.addClass("sliders");
  num.input(() => logSliderValue(num, "NUM"));

  speed = createSlider(1, 5, 3); // Set default value for speed slider to 3
  speed.position(slidersX, slidersY + 80);
  speed.size(100);
  speed.addClass("sliders");
  speed.input(() => logSliderValue(speed, "SPEED"));
}

// Function to log slider value with its name
function logSliderValue(slider, name) {
  console.log(`${name}: ${slider.value()}`);
}

function draw() {
  background(255);
  fill(0);
  textFont(font2);

  let speedValue = map(mouseY, 0, height, 1, 4); // Map mouseX position between 4 and 20 for num slider
  speed.value(speedValue); // Set the value of num slider based on mapped value

  let sizeValue = map(mouseX, 0, width, 10, 30); // Map mouseX position between 4 and 20 for num slider
  size.value(sizeValue); // Set the value of num slider based on mapped value

  let r = radius.value();
  let w = wave.value();
  let s = size.value();
  let n = num.value() * 0.01;
  let sp = speed.value();

  let hello = "Hello";
  let stranger = "Stranger";
  let m = hello.toUpperCase(); // Get value from input and convert to uppercase
  let m2 = stranger.toUpperCase();

  if (windowWidth < 600) {
    let helloPoints = font.textToPoints(m, x, y, fontSize, {
      sampleFactor: n,
    });

    let strangerPoints = font.textToPoints(m2, x, y + 100, fontSize, {
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
  resizeCanvas(windowWidth, 400);
  // Recalculate the positions of the ellipses based on the new canvas size
  x = 150; // Adjust the x-coordinate for the text

  y = 370; // Maintain the original y-coordinate for the text
  fontSize = min(windowWidth / 10, 230); // Adjust the font size based on the new canvas width
  redraw(); // Redraw the canvas to update the text and ellipses
}
