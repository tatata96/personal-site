let letterSpacing = 90;
let sp;
let angle = 0;

function setup() {
  createCanvas(800, 400);
   sp = map(mouseY, 0, height, 3, 7);

}

function draw() {
  background(0);
  stroke("red");
  fill("red");
  let strokeWidth = map(mouseX, width, 0, 20, 5);
  strokeWeight(strokeWidth);
  let rotation = sin(frameCount / 100.0) * (PI / 16);

  let w = 17;

  let offsetX = 10 * cos(angle + w) - 100; // Calculate the dynamic offset in the x-direction

  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawT();
  pop();

  translate(letterSpacing, 0);
  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawA();
  pop();

  translate(letterSpacing + 10, 0);
  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawM();
  pop();

  translate(letterSpacing + 10, 0);
  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawA();
  pop();

  translate(letterSpacing, 0);
  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawR();
  pop();

  translate(letterSpacing + 5, 0);
  push();
  translate(letterSpacing / 2, height / 2);
  rotate(rotation);
  translate(-letterSpacing / 2, -height / 2);
  drawA();
  pop();

  angle += sp;
}

function drawA() {
  push();
  strokeCap(SQUARE);
  line(68, 80, 80, 158);
  arc(50, 120, 60, 57, HALF_PI, PI + HALF_PI, CHORD);
  pop();
}

function drawR() {
  push();
  strokeCap(SQUARE);
  line(40, 80, 40, 158);
  arc(70, 102, 23, 26, 0, PI, CHORD);
  pop();
}

function drawT() {
  push();
  strokeCap(SQUARE);
  line(40, 50, 40, 160);
  line(20, 100, 70, 100);
  pop();
}

function drawM() {
  push();
  strokeCap(SQUARE);
  line(18, 141, 18, 32);
  line(18, 32, 53, 141);
  line(53, 141, 81, 32);
  line(81, 32, 81, 141);
  pop();
}
