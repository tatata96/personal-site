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

function descriptionAnimateOnLoad() {
  const text = document.getElementById("text");

  const mySplitText = new SplitType(text, {type: "words"});

  const splitTextTimeline = gsap.timeline();

  gsap.set(text, {perspective: 400});

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
      // scale: 1.5,
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

function svgAnimations() {
  const svgs = document.querySelectorAll(".svg");

  svgs.forEach((svg) => {
    svg.onload = () => {
      const svgDoc = svg.contentDocument;
      const pinkStarElement = svgDoc.getElementById("pink-star");
      const nowIsOurTimeBadge = svgDoc.getElementById("okay-sticker");
      const youDoYouSticker = svgDoc.getElementById("badge-you");


      //cloud
      const greenCloud = svgDoc.getElementById("green-cloud");
      const greenCloudLeftEye = svgDoc.getElementById("left-eye");
      const greenCloudRightEye = svgDoc.getElementById("right-eye");

      // peace-badge
      const peaceBadge = svgDoc.getElementById("peace-badge");
      const peaceBadgeBanner = svgDoc.getElementById("u-are-text-banner");
      const sparkle = svgDoc.getElementById("big-sparkle");


      const stick = svgDoc.getElementById("stick");

      window.addEventListener("mousemove", (e) => {
        const mouseX = e.pageX;
        mapMouseXRotation(mouseX, pinkStarElement, 360);
        mapMouseXRotation(mouseX, youDoYouSticker, -360);
        mapMouseXRotation(mouseX, nowIsOurTimeBadge, -30);
        mapMouseXRotation(mouseX, greenCloudLeftEye, 90);
        mapMouseXRotation(mouseX, greenCloudRightEye, 90);
        mapMouseXRotation(mouseX, peaceBadge, -24);
        mapMouseXRotation(mouseX, peaceBadgeBanner, 24);

        mapMouseXScale(mouseX, greenCloud);
        mapMouseXRotation(mouseX, sparkle, 270);
        mapMouseXScale(mouseX, sparkle);

        mapMouseXScale(mouseX, stick);
        mapMouseYTranslate(mouseX, stick);
      });
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  svgAnimations();
  headerMouseAnimation();
  descriptionAnimateOnLoad();
});
