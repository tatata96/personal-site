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

    console.log(lineHeight);
    console.log(document.querySelector("#title"));
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

function changeSVGColors() {
  const svg = document.querySelector(".svg");

  svg.onload = function () {
    const svgDoc = svg.contentDocument;
    const windowElement = svgDoc.getElementById("window");
    const pinkStarElement = svgDoc.getElementById("pink-star");

    if (windowElement) {
      windowElement.setAttribute("fill", "blue");
    }

    if (pinkStarElement) {
      pinkStarElement.setAttribute("fill", "red");
    }
  };
}

function svgAnimations() {
  changeSVGColors();
}

document.addEventListener("DOMContentLoaded", () => {
  svgAnimations();
  headerMouseAnimation()
  descriptionAnimateOnLoad();
});