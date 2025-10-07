// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const frameCount = 125;
const currentFrame = index => `images/frame_${String(index).padStart(4, '0')}.jpg`; 


const images = [];
let loadedCount = 0;

const canvas = document.getElementById("sequence");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const loader = document.querySelector(".loader");
const progressText = document.getElementById("progress-text");

// Draw image to canvas (fit to screen)
function drawImageScaled(img) {
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Preload all frames
async function preloadImages() {
  const promises = [];

  for (let i = 1; i <= frameCount; i++) {
    const url = currentFrame(i);

    const promise = fetch(url)
      .then(res => res.blob())
      .then(blob => createImageBitmap(blob))
      .then(bitmap => {
        images[i] = bitmap;
        loadedCount++;
        const percent = Math.round((loadedCount / frameCount) * 100);
        progressText.textContent = `Loading ${percent}%`;
      });

    promises.push(promise);
  }

  await Promise.all(promises);

  // Fade out loader when done
  gsap.to(loader, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      loader.style.display = "none";
      startScrollSequence();
    }
  });
}

// Start GSAP scroll-based animation
function startScrollSequence() {
  const frame = { index: 1 };

  gsap.to(frame, {
    index: frameCount - 1,
    ease: "none",
    snap: "index",
    scrollTrigger: {
      trigger: canvas,
      scrub: 1,
      pin: true,
      start: "top top",
      end: "500%",
    },
    onUpdate: () => drawImageScaled(images[Math.floor(frame.index)]),
  });

  // Draw first frame initially
  drawImageScaled(images[1]);
}

// Resize canvas when window resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawImageScaled(images[Math.floor(ScrollTrigger?.getAll()[0]?.animation().progress() * (frameCount - 1)) || 1]);
});

// Start preloading
preloadImages();
