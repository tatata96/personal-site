function headerMouseAnimation() {
  const tl = gsap.timeline();

  function mapLineSpacing(mouseX) {
    const lineHeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      10,
      70,
      mouseX
    );

    document.querySelector("#title").style.letterSpacing = lineHeight + "px";
  }

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX;
    mapLineSpacing(mouseX);
    changeThemeColor(mouseX, true);
  });

  tl.play();
}

// Original Colors
const originalColors = {
  "--color-green": "rgb(87, 159, 36)",
  "--color-yellow": "#e8bd0f",
  "--color-pink": "#e386d2",
  "--color-orange": "#e86322",
};

function changeThemeColor(mouseX, darkTheme = false) {
  const root = document.documentElement;

  // Dark Theme Colors
  const darkThemeColors = {
    "--color-green": "rgb(140, 187, 39)",
    "--color-yellow": "#e8bd0f",
    "--color-pink": "blue",
    "--color-orange": "rgb(232, 189, 15)",
  };

  // Get the target colors based on the theme
  const targetColors = darkTheme ? darkThemeColors : originalColors;

  // Iterate over colors and set new values based on mouse position
  for (const [colorVar, colorValue] of Object.entries(targetColors)) {
    const newColor =
      mouseX < window.innerWidth / 1.4 ? originalColors[colorVar] : colorValue;

    root.style.setProperty(colorVar, newColor);
  }
}

function descriptionAnimateOnLoad(elementId) {
  const text = document.getElementById(elementId);

  const mySplitText = new SplitType(text, {type: "words"});

  const splitTextTimeline = gsap.timeline();

  // gsap.set(text, {perspective: 400});

  mySplitText.split({type: "words"});
  mySplitText.words.forEach(function (el, index) {
    splitTextTimeline.from(
      el,
      {duration: 0.6, opacity: 0, force3D: true},
      index * 0.01
    );
    splitTextTimeline.from(
      el,
      {duration: 0.6, scale: index % 2 == 0 ? 0 : 2},
      index * 0.01
    );
  });
}

function mapMouseXRotation(mouseX, svgElement, rotationValue) {
  const rotation = gsap.utils.mapRange(
    0,
    window.innerWidth,
    0,
    rotationValue,
    mouseX
  );
  if (svgElement) {
    gsap.to(svgElement, 2, {
      rotation: rotation,
      transformOrigin: "50% 50%",
      ease: "back.out(1.7)",
    });
  }
}

function mapMouseXScale(mouseX, svgElement) {
  const scaleValue = gsap.utils.mapRange(0, window.innerWidth, 0.8, 1, mouseX);
  if (svgElement) {
    gsap.to(svgElement, 2, {
      scale: scaleValue,
      transformOrigin: "50% 50%",
    });
  }
}

function mapMouseYTranslate(mouseX, svgElement) {
  const translateValue = gsap.utils.mapRange(
    0,
    window.innerWidth,
    0,
    100,
    mouseX
  );
  if (svgElement) {
    gsap.to(svgElement, 2, {
      y: -translateValue,
      transformOrigin: "50% 50%",
    });
  }
}

function mapMouseXColor(x, svgElement, targetColor) {
  if (svgElement) {
    // Get the original color only if it's not already stored
    if (!svgElement.originalColor) {
      svgElement.originalColor = window.getComputedStyle(svgElement).fill;
    }

    // Calculate the new color based on the mouse position
    const mouseX = x;
    const newColor =
      mouseX < window.innerWidth / 2 ? svgElement.originalColor : targetColor;

    gsap.to(svgElement, {
      duration: 0.5,
      attr: {fill: newColor}, // Animate the fill attribute
      ease: "linear",
    });
  }
}

function svgAnimations() {
  const svgs = document.querySelectorAll(".svg");

  svgs.forEach((svg) => {
    svg.onload = () => {
      const svgDoc = svg.contentDocument;
      // Window
      const pinkStarElement = svgDoc.getElementById("pink-star");
      const windowSvg = svgDoc.getElementById("window");
      const bubblePlant = svgDoc.getElementById("bubble-plant");

      // Cloud
      const greenCloud = svgDoc.getElementById("green-cloud");
      const greenCloudLeftEye = svgDoc.getElementById("left-eye");
      const greenCloudRightEye = svgDoc.getElementById("right-eye");
      const nowIsOurTimeBadge = svgDoc.getElementById("okay-sticker");

      // Peace Badge
      const peaceBadge = svgDoc.getElementById("peace-badge");
      const peaceBadgeBanner = svgDoc.getElementById("u-are-text-banner");
      const peaceBadgeSparkle = svgDoc.getElementById("big-sparkle");

      // Palm tree get it together
      const getItTogetherBadge = svgDoc.getElementById("get-it-together-badge");
      const palmTree = svgDoc.getElementById("palm");

      // You Do You
      const youDoYouSticker = svgDoc.getElementById("badge-you");
      const crossEyes = svgDoc.getElementById("cross-eyes");

      window.addEventListener("mousemove", (e) => {
        const mouseX = e.pageX;

        // Window
        mapMouseXRotation(mouseX, pinkStarElement, 180);
        mapMouseXRotation(mouseX, windowSvg, 30);

        mapMouseXColor(mouseX, pinkStarElement, "blue");
        mapMouseXColor(mouseX, bubblePlant, "#B7F631");

        // Cloud
        mapMouseXScale(mouseX, greenCloud);
        mapMouseXRotation(mouseX, greenCloudLeftEye, 90);
        mapMouseXRotation(mouseX, greenCloudRightEye, 90);
        mapMouseXRotation(mouseX, nowIsOurTimeBadge, -30);

        // Peace Badge
        mapMouseXRotation(mouseX, peaceBadge, -24);
        mapMouseXRotation(mouseX, peaceBadgeBanner, 24);

        mapMouseXRotation(mouseX, peaceBadgeSparkle, 270);
        mapMouseXScale(mouseX, peaceBadgeSparkle);

        // Palm tree get it together
        mapMouseXScale(mouseX, getItTogetherBadge);
        mapMouseYTranslate(mouseX, getItTogetherBadge);
        mapMouseXColor(mouseX, palmTree, "blue");

        // You Do You
        mapMouseXRotation(mouseX, youDoYouSticker, -360);
        mapMouseXColor(mouseX, crossEyes, "blue");
      });
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  svgAnimations();
  headerMouseAnimation();

  // descriptionAnimateOnLoad("text")
});
