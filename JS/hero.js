function initializeHeroAnimation() {
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from(".logo", { /* Animate the logo */
      scale: 0,
      opacity: 0,
      duration: 2.2,
      ease: "back.out(0.7)"
    })
    .fromTo(".slogan h1", { /* Animate the slogan text */
      clipPath: "inset(0 100% 0 0)",
      textShadow: "0 0 14px rgba(255, 255, 255, 0.9)"
    }, {
      clipPath: "inset(0 0 0 0)",
      duration: 0.2,
      ease: "power1.inOut"
    })
    .to(".slogan h1", { /* Animate the text shadow to fade out */
      textShadow: "0 0 0 rgba(255, 255, 255, 0)",
      duration: 0.2,
      ease: "power1.out" 
    });
}

if (document.readyState === "loading") { /* Check if the document is still loading */
  document.addEventListener("DOMContentLoaded", initializeHeroAnimation, { once: true });
} else {
  initializeHeroAnimation();
}
