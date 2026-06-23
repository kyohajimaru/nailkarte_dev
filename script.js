const animatedItems = document.querySelectorAll(".fade-up, .fade-in");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  animatedItems.forEach((item) => revealObserver.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

const parallaxItems = document.querySelectorAll("[data-parallax]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

parallaxItems.forEach((item) => {
  const baseTransform = window.getComputedStyle(item).transform;
  item.dataset.baseTransform = baseTransform === "none" ? "" : baseTransform;
});

function updateParallax() {
  const scrollY = window.scrollY || window.pageYOffset;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const baseTransform = item.dataset.baseTransform || "";
    item.style.transform = `${baseTransform} translate3d(0, ${scrollY * speed}px, 0)`.trim();
  });

  ticking = false;
}

function requestParallax() {
  if (reduceMotion.matches || ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateParallax);
}

window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);
requestParallax();
