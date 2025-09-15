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
    path: "./animationtrans2.json",
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
  const contents = document.querySelectorAll(".transport-content");

  // JSON animation files (replace with your paths)
  const jsonFiles = [
    "./animationtrans2.json",
    "./animationtrans1.json",
    "./animationtrans2.json",
    "./animationtrans2.json"
  ];

  const animations = [];

  // Load all Lottie animations
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

  // ScrollTrigger logic
  ScrollTrigger.create({
    trigger: "",
    start: "top top",
    end: () => `+=${window.innerHeight * contents.length}`,
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      const progress = self.progress * contents.length;
      const index = Math.floor(progress);
      const localProgress = progress - index;

      // Activate correct content
      contents.forEach((c, i) => c.classList.toggle("active", i === index));

      // Scrub animation
      const anim = animations[index];
      if (anim && anim.isLoaded) {
        const frame = Math.floor(localProgress * anim.totalFrames);
        anim.goToAndStop(frame, true);
      }
    }
  });
});

