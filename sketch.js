let fontSize = 150;
let grotesk;
let firstLetter = [];
let secondLetter = [];
let finalPositions = []; // Array to store final positions of letters
let x, y;
let targetWord = "Tamara";
let animationComplete = false;
let pointPositions = []; // Array to store the original positions of points
let explosionRadius = 50; // Radius for the explosion effect
let ellipseSize = 10; // Size of the ellipse
let columnWidth; // Width of each column
let sampleFactor;
function preload() {
  grotesk = loadFont("./fonts/Manrope-Regular.ttf");
}

function setup() {
  sampleFactor = map(200, document.body.clientWidth, 3, 1, 0.1);
  console.log(sampleFactor);

  console.log(sampleFactor);
  createCanvas(document.body.clientWidth, windowHeight / 4);
  textFont(grotesk);
  textSize(fontSize);
  x = document.body.clientWidth / 12;
  y = height / 2 + 65;
  columnWidth = width / 6;
  firstLetter = grotesk.textToPoints("Salute", x, y, fontSize, {
    sampleFactor: 1,
  });
  secondLetter = grotesk.textToPoints(targetWord, x, y, fontSize, {
    sampleFactor: 1,
  });
  // Store final positions of letters
  for (let i = 0; i < secondLetter.length; i++) {
    finalPositions.push({x: secondLetter[i].x, y: secondLetter[i].y});
  }
  // Store original positions of points
  for (let i = 0; i < firstLetter.length; i++) {
    pointPositions.push({x: firstLetter[i].x, y: firstLetter[i].y});
  }
}

function draw() {
  noStroke();
  background("black");
  if (!animationComplete) {
    for (let i = 0; i < min(firstLetter.length, secondLetter.length); i++) {
      let morphX = map(frameCount, 0, 120, firstLetter[i].x, secondLetter[i].x);
      let morphY = map(frameCount, 0, 120, firstLetter[i].y, secondLetter[i].y);
      fill("purple");
      ellipse(morphX, morphY, ellipseSize, ellipseSize);
    }
    if (frameCount >= 120) {
      animationComplete = true;
      // Store final positions of letters
      for (let i = 0; i < secondLetter.length; i++) {
        finalPositions.push({x: secondLetter[i].x, y: secondLetter[i].y});
      }
    }
  } else {
    for (let i = 0; i < finalPositions.length; i++) {
      // Oscillate the x-values of the letters based on a sine wave
      let oscillation = sin(frameCount * 0.05 + i * 0.01) * 2; // Adjust the amplitude and frequency as needed
      let newX = finalPositions[i].x + oscillation;
      let newY = finalPositions[i].y;
      fill("blue");
      ellipse(newX, newY, ellipseSize, ellipseSize);
    }
    // Check mouse position for explosion effect on "Tamara" text
    for (let i = 0; i < secondLetter.length; i++) {
      let pointPos = createVector(secondLetter[i].x, secondLetter[i].y);
      let distance = dist(mouseX, mouseY, pointPos.x, pointPos.y);
      if (distance < explosionRadius) {
        // Apply random movement when mouse is over the text
        secondLetter[i].x += noise(-3, 3);
        secondLetter[i].y += noise(-3, 3);
      } else {
        // Return to original position when mouse moves away
        secondLetter[i].x = finalPositions[i].x;
        secondLetter[i].y = finalPositions[i].y;
      }
      let oscillation = sin(frameCount * 0.05 + i * 0.01) * 2;

      fill("pink");
      ellipse(
        secondLetter[i].x + oscillation,
        secondLetter[i].y,
        ellipseSize / 2,
        ellipseSize / 2
      );
    }
  }
  // // Draw vertical lines to divide the canvas into 6 columns
  // for (let i = 1; i < 6; i++) {
  //   stroke(0);
  //   line(i * columnWidth, 0, i * columnWidth, height);
  // }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, windowHeight / 4);
  columnWidth = width / 6;
  x = document.body.clientWidth / 4;

  fontSize = document.body.clientWidth / 10;
  console.log(fontSize);
}
