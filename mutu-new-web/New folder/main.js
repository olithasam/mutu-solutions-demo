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
        end: () => "+=" + window.innerHeight * 1.5, // scroll distance for hero Lottie
        scrub: true,
        pin: true,
        anticipatePin: 1
        // markers: true // uncomment to debug
      }
    });
  });

  // -------------------- ABOUT SECTION --------------------
  const aboutSection = document.querySelector(".about");
  ScrollTrigger.create({
    trigger: aboutSection,
    start: "top 80%",
    onEnter: () => aboutSection.classList.add("visible"),
    onLeaveBack: () => aboutSection.classList.remove("visible")
  });


  
  // -------------------- TRANSPORT SECTION --------------------
  const transportSection = document.querySelector("#transport");
  if (transportSection) {
    const stepEls = transportSection.querySelectorAll(".step");
    const animEls = transportSection.querySelectorAll(".anim");

    const steps = stepEls.length;

    // JSON files for transport Lottie animations
    const jsonFiles = [
      "./animationtrans.json",
      "./animationtrans.json",
      "./animationtrans.json"
    ];

    const lotties = [];

    // Load each Lottie animation
    animEls.forEach((el, i) => {
      el.innerHTML = "";
      const anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: jsonFiles[i] || jsonFiles[0],
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
      });
      lotties[i] = anim;

      // hide all except first
      anim.addEventListener("data_ready", () => {
        if (i === 0) el.classList.add("active");
        else el.classList.remove("active");
      });
    });

    // show first step
    stepEls.forEach((s, i) => s.classList.toggle("active", i === 0));

    // Dynamic start: transport begins after hero finishes
    const heroEnd = document.querySelector(".lottie-container").offsetHeight * 1.5;

    ScrollTrigger.create({
      trigger: transportSection,
      start: () => heroEnd,
      end: () => heroEnd + window.innerHeight * (steps - 1),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const totalTransitions = Math.max(1, steps - 1);
        const scaled = self.progress * totalTransitions;
        let index = Math.floor(scaled + 1e-8);
        index = Math.min(Math.max(index, 0), steps - 1);
        const localProgress = scaled - index;

        // Update active text
        stepEls.forEach((el, i) => el.classList.toggle("active", i === index));

        // Update Lottie animation
        animEls.forEach((el, i) => el.classList.toggle("active", i === index));
        const anim = lotties[index];
        if (anim && anim.totalFrames > 0) {
          const frame = Math.floor(localProgress * anim.totalFrames);
          anim.goToAndStop(frame, true);
        }
      }
    });

    // refresh on resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }
});
