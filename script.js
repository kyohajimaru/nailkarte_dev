const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const screenTrack = document.querySelector("[data-screen-track]");
const screenSlides = Array.from(document.querySelectorAll(".screen-slide"));
const screenDots = Array.from(document.querySelectorAll("[data-screen-dot]"));
const prevButton = document.querySelector("[data-screen-prev]");
const nextButton = document.querySelector("[data-screen-next]");
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

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
  if (!screenSlides.length) return;

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

const setFaqState = (item, open) => {
  const trigger = item.querySelector(".faq-trigger");
  const panel = item.querySelector(".faq-panel");

  item.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  panel?.setAttribute("aria-hidden", String(!open));
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

faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-trigger");
  const panel = item.querySelector(".faq-panel");

  if (!trigger || !panel) return;

  trigger.addEventListener("click", () => {
    setFaqState(item, !item.classList.contains("is-open"));
  });
});
