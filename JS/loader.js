const loader = document.createElement("div");
loader.className = "page-loader";
loader.id = "page-loader";

// 3-piece Wi-Fi SVG 
loader.innerHTML = `
  <svg class="wifi-loader" viewBox="0 0 120 100" aria-hidden="true">
    <!--Top-->
    <path class="wifi-bar wifi-bar-3" d="M 12 42 A 68 68 0 0 1 108 42" />
    
    <!--Middle-->
    <path class="wifi-bar wifi-bar-2" d="M 28 60 A 45 45 0 0 1 92 60" />
    
    <!--Bottom-->
    <path class="wifi-bar wifi-bar-1" d="M 60 92 L 42 74 A 25 25 0 0 1 78 74 Z" />
  </svg>
  <p class="loader-text">CONNECTING...</p>
`;

// Adds loader to body
document.body.prepend(loader);

//Hides loader once the page and assets have loaded
window.addEventListener("load", () => {

  setTimeout(() => {
    loader.classList.add("loader-hidden");
  }, 700);
});