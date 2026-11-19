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
let isDragging = false; // Tracks if  user is holding down the mouse on scrollbar

// Do nothing on mobile screens
function updateScrollbar() {
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
  // Anchor the line to the ball's exact height so it retracts into it
  line.style.transformOrigin = `center ${scrollPercent}%`;
}

// Scroll the page to match where the mouse is on the track
function scrollToMousePosition(mouseY) {
  const track = scrollbar.getBoundingClientRect();
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Finds how far down the track the mouse is 
  const clickPosition = mouseY - track.top;
  const percent = Math.max(0, Math.min(1, clickPosition / track.height));

  // Jump to scroll position
  window.scrollTo({
    top: percent * maxScroll,
    behavior: "instant"
  });
}

// Drag when the user clicks on scrollbar 
scrollbar.addEventListener("mousedown", (event) => {
  isDragging = true;
  clearTimeout(scrollTimer);
  scrollbar.classList.add("is-scrolling", "is-dragging");
  document.body.style.userSelect = "none"; // Stops accidental text highlighting while dragging

  scrollToMousePosition(event.clientY);
});

// Move page as mouse moves while held down
window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  scrollToMousePosition(event.clientY);
});

// Stops dragging when user lets go of mouse button
window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  scrollbar.classList.remove("is-dragging");
  document.body.style.userSelect = ""; // Turns normal text selection back on

  // Fade the glow and retract the line after letting go
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    scrollbar.classList.remove("is-scrolling");
  }, 400);
});

// Listen for scrolling to turn on the intense glow and extend the line
window.addEventListener("scroll", () => {
  updateScrollbar();

  // Turn on glow and line
  scrollbar.classList.add("is-scrolling");

  // Reset the timer every time the user moves the scroll wheel
  clearTimeout(scrollTimer);

// Only fade out if the user is not currently holding/dragging the ball
  if (!isDragging) {
    scrollTimer = setTimeout(() => {
      scrollbar.classList.remove("is-scrolling");
    }, 400);
  }
});

// Update position on page load and if the browser window is resized
window.addEventListener("resize", updateScrollbar);
updateScrollbar();