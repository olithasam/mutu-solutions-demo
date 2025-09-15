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
  