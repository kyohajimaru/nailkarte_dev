const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const screenTrack = document.querySelector("[data-screen-track]");
const screenSlides = Array.from(document.querySelectorAll(".screen-slide"));
const screenDots = Array.from(document.querySelectorAll("[data-screen-dot]"));
const prevButton = document.querySelector("[data-screen-prev]");
const nextButton = document.querySelector("[data-screen-next]");

let activeScreen = 0;

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);

const updateScreens = (nextIndex) => {
  activeScreen = (nextIndex + screenSlides.length) % screenSlides.length;
  if (screenTrack) {
    screenTrack.style.transform = `translateX(-${activeScreen * 100}%)`;
  }
  screenSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeScreen);
  });
  screenDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeScreen);
  });
};

revealItems.forEach((item) => revealObserver.observe(item));
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

screenDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateScreens(Number(dot.dataset.screenDot));
  });
});

prevButton?.addEventListener("click", () => updateScreens(activeScreen - 1));
nextButton?.addEventListener("click", () => updateScreens(activeScreen + 1));
