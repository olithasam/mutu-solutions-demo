document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // -------------------- HERO LOTTIE --------------------
  const heroContainer = document.querySelector(".animation");
  const heroPlayhead = { frame: 0 };
  const heroAnim = lottie.loadAnimation({
    container: heroContainer,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "./samplebg.json",
    rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
  });

  heroAnim.addEventListener("data_ready", () => {
    gsap.to(heroPlayhead, {
      frame: heroAnim.totalFrames - 1,
      ease: "none",
      onUpdate: () => heroAnim.goToAndStop(heroPlayhead.frame, true),
      scrollTrigger: {
        trigger: ".lottie-container",
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.5, // scroll distance for hero Lottie
        scrub: true,
        pin: true,
        anticipatePin: 1
        // markers: true // uncomment to debug
      }
    });
  });
   });
  

 document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const transportSection = document.querySelector("#transport");
  const contents = Array.from(document.querySelectorAll(".transport-content"));
  const jsonFiles = [
    "./animationtrans1.json",
    "./animationtrans2.json",
    "./animationtrans3.json",
    "./animationtrans4.json"
  ];

  const animations = [];

  // Load Lottie animations
  contents.forEach((content, i) => {
    const animContainer = content.querySelector(".transport-animation");
    const anim = lottie.loadAnimation({
      container: animContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: jsonFiles[i],
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
    });
    animations.push(anim);
  });

  let currentIndex = -1;

  ScrollTrigger.create({
    trigger: transportSection,
    start: "top top",
    end: () => `+=${window.innerHeight * contents.length}`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      const progress = gsap.utils.clamp(0, 0.9999, self.progress);
      const index = Math.floor(progress * contents.length);

      if (index !== currentIndex) {
        currentIndex = index;
        activateContent(index);
      }
    }
  });

  function activateContent(i) {
    contents.forEach((c, j) => c.classList.toggle("active", j === i));

    animations.forEach((a, idx) => {
      if (a && idx !== i) a.stop();
    });

    const anim = animations[i];
    if (anim) {
      anim.goToAndStop(0, true);
      anim.play();
    }
  }
});
