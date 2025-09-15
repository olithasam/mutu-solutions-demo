document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Lottie
  let heroContainer = document.querySelector(".animation");
  let heroPlayhead = { frame: 0 };
  let heroAnim = lottie.loadAnimation({
    container: heroContainer,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "./animation.json",
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
        end: "bottom+=3000 top",
        scrub: true,
        pin: true
      }
    });
  });

  // About section fade-in
  const aboutSection = document.querySelector(".about");
  ScrollTrigger.create({
    trigger: aboutSection,
    start: "top 80%",
    onEnter: () => aboutSection.classList.add("visible"),
    onLeaveBack: () => aboutSection.classList.remove("visible")
  });

  // Transport section
  const transportSection = document.querySelector("#transport");
  const transportContainers = document.querySelectorAll(".transport-container");
  const jsonFiles = [
    "./animationtrans.json",
    "./animationtrans.json",
    "./animationtrans.json"
  ];

  const animations = [];

  // Load Lottie animations
  transportContainers.forEach((container, index) => {
    const animContainer = container.querySelector(".transport-animation");
    const anim = lottie.loadAnimation({
      container: animContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: jsonFiles[index],
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
    });
    animations.push(anim);
  });

 ScrollTrigger.create({
  trigger: transportSection,
  start: "top bottom", // transport section top enters bottom of viewport
  end: () => `+=${window.innerHeight * transportContainers.length}`,
  scrub: true,
  pin: "#transport",
  onUpdate: (self) => {
    const progress = self.progress * transportContainers.length;
    const currentIndex = Math.floor(progress);
    const localProgress = progress - currentIndex;

    transportContainers.forEach((c, i) => c.classList.remove("active"));
    if (currentIndex < transportContainers.length) transportContainers[currentIndex].classList.add("active");

    const anim = animations[currentIndex];
    if (anim) {
      const frame = Math.floor(localProgress * anim.totalFrames);
      anim.goToAndStop(frame, true);
    }
  }
});

});
