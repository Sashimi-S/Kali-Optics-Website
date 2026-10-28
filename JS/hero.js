function initializeHeroAnimation() {
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from(".logo", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "back.out(1.7)"
    })
    .to(".slogan h1", {
      backgroundPosition: "-200% center",
      duration: 2,
      ease: "power1.inOut"
    }, "+=0.3");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHeroAnimation, { once: true });
} else {
  initializeHeroAnimation();
}


