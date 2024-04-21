function headerMouseAnimation() {
  const tl = gsap.timeline();

  function mapLineSpacing(mouseX) {
    const lineHeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      10,
      100,
      mouseX
    );

    document.querySelector("#title").style.letterSpacing = lineHeight + "px";
  }

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX;
    mapLineSpacing(mouseX);
  });

  tl.play();
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

function stringToRgb(colorString) {
  // Remove the hash (if any) from the color string
  const color = colorString.replace("#", "");

  // Convert the color string to an RGB object
  const rgb = {
    r: parseInt(color.substring(0, 2), 16),
    g: parseInt(color.substring(2, 4), 16),
    b: parseInt(color.substring(4, 6), 16),
  };

  return rgb;
}

function mapMouseXColor(x, svgElement, targetColor, duration) {
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
      duration: duration,
      attr: {fill: newColor}, // Animate the fill attribute
      stroke: "black",
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

      // You Do You
      const youDoYouSticker = svgDoc.getElementById("badge-you");

      const paths = svgDoc.querySelectorAll("path");
      const circles = svgDoc.querySelectorAll("circle");
      const rects = svgDoc.querySelectorAll("rect");

      window.addEventListener("mousemove", (e) => {
        const mouseX = e.pageX;

        // paths.forEach((path) => {
        //   mapMouseXColor(mouseX, path, "white", 0.5);
        // });

        // circles.forEach((path) => {
        //   mapMouseXColor(mouseX, path, "white",  0.5);
        // });

        // rects.forEach((path) => {
        //   mapMouseXColor(mouseX, path, "white",  0.5);
        // });

        // Window
        mapMouseXRotation(mouseX, pinkStarElement, 180);
        mapMouseXColor(mouseX, pinkStarElement, "blue", 1);

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

        // You Do You
        mapMouseXRotation(mouseX, youDoYouSticker, -360);
      });
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  svgAnimations();
  headerMouseAnimation();
  descriptionAnimateOnLoad();


  descriptionAnimateOnLoad("text")
  descriptionAnimateOnLoad("text2")
  descriptionAnimateOnLoad("text3")


});
