const sizes = [
  {widthMin: 40, widthMax: 100, heightMin: 80, heightMax: 120}, // Original
  {widthMin: 50, widthMax: 125, heightMin: 100, heightMax: 150}, // Large
  {widthMin: 30, widthMax: 80, heightMin: 60, heightMax: 100}, // Medium
];

let colors = [
  "#FFD601",
  "#FF8CF4",
  "#EE4A37",
  "#8A0F52",
  "#0F3DD4",
  "#0C7114",
  "#88E1FF",
];

function createPetal(angle, sizeIndex) {
  const petal = document.createElement("img");
  petal.classList.add("pedal");
  petal.src = Math.random() > 0.5 ? "./media/photos/cloud.png" : "./media/photos/CLOUD_2.png";
  petal.alt = "petal";

  const {widthMin, widthMax, heightMin, heightMax} = sizes[sizeIndex];

  const randomWidth =
    (Math.floor(Math.random() * (widthMax - widthMin + 1)) + widthMin) / 100;
  const randomHeight =
    (Math.floor(Math.random() * (heightMax - heightMin + 1)) + heightMin) / 100;

 // petal.style.transform = `rotate(${angle}deg)`;

  gsap.fromTo(
    petal,
    {
      scaleX: 0,
      scaleY: 0,
    },
    {
      scaleX: randomWidth,
      scaleY: randomHeight,
      duration: 1.5,
      ease: "elastic.out(1,0.3)",
    }
  );

  return petal;
}

// Function to create a flower
function createFlower() {
  let pedalCount = 5;
  const flower = document.createElement("div");
  flower.classList.add("flower");

  const color = colors[Math.floor(Math.random() * colors.length)];

  const sizeIndex = Math.floor(Math.random() * sizes.length);


  const angle = (360 / pedalCount) * 1;
  const petal = createPetal(angle, sizeIndex);

  flower.appendChild(petal);
  return flower;
}

window.onload = init;
let isPageVisible = true;
let isMousePressed = false;
let mouseMoveCounter = 0;

function init() {
  //Set up event callbacks
  window.onmousemove = onMouseMove;
  window.onkeypress = onKeyPress;
  window.onmousedown = onMouseDown;
  window.onclick = function (e) {
    onMouseClick(e, false);
  };

  // events for mobile
  window.ontouchmove = onMouseMove;
  window.ontouchstart = function (e) {
    onMouseClick(e, true);
  };

  // animates title
  const bakersTitle = new SplitType("#bakers-title-real");
  gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 0.3,
    duration: 0.1,
    onStart: () => {
      if( document.querySelector(".bakers-title")){
        document.querySelector(".bakers-title").classList.remove("hidden");
      }
    },
  });

  // Generate flowers at regular intervals after title animation

  document.addEventListener("visibilitychange", handleVisibilityChange);
}
function handleVisibilityChange() {
  isPageVisible = document.visibilityState === "visible";
}

function onMouseMove(e) {
  if (isMousePressed || isTouchActive) {
    // Check if the event is a touch event
    const isTouch = e.type === 'touchmove';

    // Calculate the coordinates based on the event type
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    // we don't want continuously create flower at all times
    mouseMoveCounter++;
    if (mouseMoveCounter % 8 === 0) {
      addObject(clientX - 50, clientY - 100);
    }
  }
}

function onMouseClick(e, isTouch) {
  isMousePressed = true;

  if (isTouch) {
    isTouchActive = true; // Set the touch active flag
    const touch = e.touches[0];
    if (touch) {
      addObject(touch.clientX - 50, touch.clientY - 100);
    }
  } else {
    addObject(e.clientX - 50, e.clientY - 100);
  }
}

// Add a touchend event handler to detect when the touch ends
document.addEventListener('touchend', function () {
  isTouchActive = false;
});

// Initialize the isTouchActive flag to false
let isTouchActive = false;

function onKeyPress() {
  //Clear all active and inactive elements

  document.querySelector(".flowers").innerHTML = "";
}
function addObject(x, y) {
  //Create DOM element
  let element = createFlower();

  element.style.left = x + "px";

  const rotationAngles = [-160, -120, 120, 160, 240, 360, -240, -360];
  const randomRotation =
    rotationAngles[Math.floor(Math.random() * rotationAngles.length)];

  document.querySelector(".flowers").appendChild(element);

  // animate flower
  gsap.fromTo(
    element,
    {y: y},
    {
      y: window.innerHeight + 100,
      duration: 2,
      ease: "power1.in",
      rotate: randomRotation,
      onComplete: () => {
        element.parentNode.removeChild(element);
      },
    }
  );
}

function onMouseDown() {
  let interval = setInterval(() => {
    isMousePressed = true;
  }, 200);
  window.addEventListener("click", () => {
    clearInterval(interval);
    isMousePressed = false;
  });
}
