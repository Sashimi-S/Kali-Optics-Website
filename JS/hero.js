function initializeHeroAnimation() {
  if (typeof gsap === "undefined") return;

  const heroTimeline = gsap.timeline({
    delay: 0.7 
  });

  heroTimeline
    .fromTo(".logo", { /* Logo */
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 2.2,
      ease: "back.out(0.7)",
      clearProps: "transform" 
    })
    .fromTo(".slogan h1", { /* Slogan Text */
      clipPath: "inset(0 100% 0 0)",
      textShadow: "0 0 14px rgba(255, 255, 255, 0.9)"
    }, {
      clipPath: "inset(0 0 0 0)",
      duration: 0.2,
      ease: "power1.inOut"
    })
    .to(".slogan h1", { /* Animates the text shadow to fade out */
      textShadow: "0 0 0 rgba(255, 255, 255, 0)",
      duration: 0.25,
      ease: "power1.out"
    });
}

if (typeof gsap !== "undefined") {
  gsap.set(".logo", { opacity: 0 });
  gsap.set(".slogan h1", { clipPath: "inset(0 100% 0 0)" });
}

// Wait for all images to finish load before animating
if (document.readyState === "complete") {
  initializeHeroAnimation();
} else {
  window.addEventListener("load", initializeHeroAnimation, { once: true });
}