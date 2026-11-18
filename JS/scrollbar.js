const scrollbar = document.createElement("div");
scrollbar.className = "custom-scrollbar";
scrollbar.setAttribute("aria-hidden", "true");

const line = document.createElement("div");
line.className = "scrollbar-line";

const ball = document.createElement("div");
ball.className = "scrollbar-ball";

// Puts line and ball inside the scrollbar container
scrollbar.appendChild(line);
scrollbar.appendChild(ball);
document.body.appendChild(scrollbar);

let scrollTimer; // Tracks when user stops scrolling

// Calculates scroll position and moves the ball
function updateScrollbar() {
  // Do nothing on mobile screens
  if (window.innerWidth <= 768) {
    scrollbar.style.display = "none";
    return;
  }

  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Hide the custom scrollbar if the page is too short to scroll
  if (maxScroll <= 0) {
    scrollbar.style.display = "none";
    return;
  } else {
    scrollbar.style.display = "block";
  }

  // Convert scroll position into %
  const scrollPercent = (scrollTop / maxScroll) * 100;
  // Moves the ball down the track
  ball.style.top = `${scrollPercent}%`;
  // Anchor the line to the ball's exact height so it retracts right into it
  line.style.transformOrigin = `center ${scrollPercent}%`;
}

// Listen for scrolling to turn on the intense glow and extend the line
window.addEventListener("scroll", () => {
  updateScrollbar();

  // Turn on glow and line
  scrollbar.classList.add("is-scrolling");

  // Reset the timer every time the user moves the scroll wheel
  clearTimeout(scrollTimer);

  // Wait 700ms after scrolling stops, then fade the glow and pull the line back in
  scrollTimer = setTimeout(() => {
    scrollbar.classList.remove("is-scrolling");
  }, 700);
});

// Update position on page load and if the browser window is resized
window.addEventListener("resize", updateScrollbar);
updateScrollbar();