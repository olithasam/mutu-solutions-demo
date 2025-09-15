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



// ---------- Transport scrollytelling (replace previous transport block) ----------
const transportSection = document.querySelector("#transport");
if (transportSection) {
  const stepEls = transportSection.querySelectorAll(".step");
  const animEls = transportSection.querySelectorAll(".anim");

  // JSON Lottie files - replace with your correct paths
  const jsonFiles = [
    "./animationtrans.json",
    "./animationtrans.json",
    "./animationtrans.json"
  ];

  // Load each Lottie into its own container
  const lotties = [];
  animEls.forEach((el, i) => {
    // ensure container is empty
    el.innerHTML = "";
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: jsonFiles[i] || jsonFiles[0], // fallback
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
    });

    // Keep reference
    lotties[i] = anim;

    // hide all except first after data ready
    anim.addEventListener("data_ready", () => {
      if (i === 0) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });

  // ensure first step visible at start
  stepEls.forEach((s, i) => s.classList.toggle("active", i === 0));

  // Create ScrollTrigger
  const steps = stepEls.length;
  // endDistance = (steps - 1) * viewport height (so we have that many transitions)
  const getEnd = () => window.innerHeight * Math.max(0, steps - 1);

  ScrollTrigger.create({
    trigger: transportSection,
    start: "top top",
    end: () => "+=" + getEnd(),
    scrub: true,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      // scale progress to number of transitions (steps - 1)
      const totalTransitions = Math.max(1, steps - 1);
      const scaled = self.progress * totalTransitions;
      let index = Math.floor(scaled + 1e-8); // 0..steps-1
      index = Math.min(Math.max(index, 0), steps - 1);

      const localProgress = scaled - index; // 0..1 for the active step's animation

      // toggle active class on steps (left)
      stepEls.forEach((el, i) => el.classList.toggle("active", i === index));

      // show only the active Lottie container
      animEls.forEach((el, i) => el.classList.toggle("active", i === index));

      // drive the current Lottie animation to the correct frame
      const anim = lotties[index];
      if (anim && anim.totalFrames && anim.totalFrames > 0) {
        const frame = Math.floor(localProgress * anim.totalFrames);
        anim.goToAndStop(frame, true);
      }
    }
  });

  // Refresh on resize to recalc end
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}
// -------------------------------------------------------------------------------


});