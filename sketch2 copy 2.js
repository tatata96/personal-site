let letterSpacing = 90;
let angles = [0, 0, 0, 0, 0, 0]; // Initial angles for each letter
let amplitudes = [10, 5, 15, 8, 12, 7]; // Amplitude for each letter
let frequencies = [0.01, 0.02, 0.015, 0.025, 0.018, 0.021]; // Frequency for each letter

function setup() {
  createCanvas(windowWidth, 400);
}

function draw() {
  background(0);
  stroke("#d5f536");
  noFill();
  let strokeWidth = map(mouseX, 0, width , 28, 15);
  strokeWeight(strokeWidth);
  let rotation = sin(frameCount / 100.0) * (PI / 16);

  letterSpacing = map(mouseX, 0, width , 90, 200);

  for (let i = 0; i < 6; i++) {
    let offsetY = amplitudes[i] * sin(angles[i]); // Calculate the dynamic offset in the y-direction based on a sine wave

    let xTranslate = i * (letterSpacing + 10); // Calculate x translation for each letter

    push();
    translate(xTranslate + letterSpacing / 2, height / 2 + offsetY);
    // rotate(rotation);
    translate(-letterSpacing / 2, -height / 2);
    switch (i) {
      case 0:
        drawT();
        break;
      case 1:
      case 3:
      case 5:
        drawA();
        break;
      case 2:
        drawM();
        break;
      case 4:
        drawR();
        break;
    }
    pop();

    angles[i] += frequencies[i]; // Increment angle to create the wave motion
  }
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
