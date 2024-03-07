function generateCircles(numberOfCircles, radius, containerId) {
  const container = document.getElementById(containerId);

  const opacity = 1;
  const circleSize = "800px";

  const gradients = [
    `radial-gradient(circle, rgba(255, 255, 107, ${opacity}), rgba(255, 209, 102, ${opacity}))`,
    `radial-gradient(circle, rgba(107, 255, 149, ${opacity}), rgba(136, 176, 75, ${opacity}))`,
    `radial-gradient(circle, rgba(255, 170, 222, ${opacity}), rgba(255, 140, 148, ${opacity}))`,
    `radial-gradient(circle, rgba(255, 107, 102, ${opacity}), rgba(255, 209, 102, ${opacity}))`,
    `radial-gradient(circle, rgba(107, 91, 149, ${opacity}), rgba(136, 176, 75, ${opacity}))`,
    `radial-gradient(circle, rgba(255, 170, 166, ${opacity}), rgba(255, 140, 148, ${opacity}))`,
    `radial-gradient(circle, rgba(255, 107, 107, ${opacity}), rgba(255, 209, 102, ${opacity}))`,
    `radial-gradient(circle, rgba(107, 91, 149, ${opacity}), rgba(136, 176, 75, ${opacity}))`,
  ];

  for (let i = 0; i < numberOfCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    // Random gradient for each circle
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    circle.style.background = randomGradient;

    circle.style.width = circleSize;
    circle.style.height = circleSize;


    // if (i % 2 == 0) {
    //   circle.style.mixBlendMode = "multiply";
    // } else {
    //   circle.style.mixBlendMode = "screen";
    // }

    // // Random opacity for each circle
    // const randomOpacity = 0.4 + Math.random() * (1 - 0.4);
    // circle.style.opacity = randomOpacity;

    const angle = (360 / numberOfCircles) * i;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);

    circle.style.left = `calc(50% + ${x}px - 25px)`;
    circle.style.top = `calc(50% + ${y}px - 25px)`;

    container.appendChild(circle);
  }

  //animate circles
  gsap.fromTo(
    ".circle",
    {scaleX: 0, scaleY: 0},
    {
      scaleX: 1,
      scaleY: 1,
      duration: 1,
      delay: 1,
      stagger: 0.2,
      // onComplete: function() {
      //   // Start breathing animation after the initial scaling animation completes
      //   gsap.to(".circle", {
      //     scale: 1.1,
      //     repeat: -1,
      //     yoyo: true,
      //     duration: 3,
      //     ease: "power1.inOut",
      //   });
      // }
    }
  );

  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.addEventListener("mouseover", () => {
      gsap.to(circle, {
        scale: 1.2,
        y: -50,
        x: -50,

        rotation: 360,
        duration: 1,
        ease: "power2.inOut",
      });
    });
    circle.addEventListener("mouseout", () => {
      gsap.to(circle, {
        scale: 1,
        rotation: 0,
        y: +50,
        x: +50,

        duration: 1,
        ease: "power2.inOut",
      });
    });
  });
}

generateCircles(17, 900, "circles");

// element with class main-panel should come from the top when page is loaded use gsap

gsap.from(".main-panel", {y: -1000, duration: 2, ease: "power2.inOut"});

// element with class right-panel should come from bottom to top on load
gsap.from(".left-panel", {y: 1000, duration: 2, ease: "power2.inOut"});

gsap.from(".left-panel .info", {
  autoAlpha: 0,
  x: -1000,
  duration: 1.5,
  ease: "power2.inOut",
  delay: 2.5,
});
