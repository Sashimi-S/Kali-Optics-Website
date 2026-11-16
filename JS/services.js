gsap.registerPlugin(ScrollTrigger);

const serviceCards = document.querySelectorAll(".service-card");

//  Loops through each card and animate it when it enters the screen
serviceCards.forEach((card) => {
  gsap.fromTo(
    card,
    {
      opacity: 0, // Starts invisible
      y: 40       
    },
    {
      opacity: 1, // Fades in completely
      y: 0,       // Slides up into its normal position
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%", // Starts when the top of the card hits 80% of the screen height
        toggleActions: "play none none reverse" // Plays on scroll down, reverses cleanly if scrolled back up
      }
    }
  );
});