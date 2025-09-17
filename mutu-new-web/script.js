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

  const contents = document.querySelectorAll(".transport-content");
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
      loop: false,          // let it finish once
      autoplay: false,      // play only when active
      path: jsonFiles[i],
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
    });
    animations.push(anim);
  });

  // ScrollTrigger for each content
  contents.forEach((content, i) => {
    ScrollTrigger.create({
      trigger: content,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // deactivate others
        contents.forEach((c, j) => c.classList.toggle("active", j === i));

        // play this animation normally
        if (animations[i]) {
          animations[i].goToAndStop(0, true); // reset to start
          animations[i].play();
        }
      },
      onEnterBack: () => {
        contents.forEach((c, j) => c.classList.toggle("active", j === i));

        if (animations[i]) {
          animations[i].goToAndStop(0, true);
          animations[i].play();
        }
      }
    });
  });
});

