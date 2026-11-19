//API Endpoints and Keys
const GEOAPIFY_KEY = "2d65ae4a464c4047874b0ddb4344c296"; 
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/6aef2168ac6210605a753997/latest"; 

const statusBox = document.getElementById("map-status");

//Initialize the Leaflet map centered on Gauteng 
const map = L.map("kali-map").setView([-26.08, 28.08], 9);

// 3. Add Geoapify Dark Matter tiles 
L.tileLayer(
  `https://maps.geoapify.com/v1/tile/dark-matter-dark-grey/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`,
  {
    attribution: '&copy; OpenStreetMap contributors, &copy; Geoapify',
    maxZoom: 18
  }
).addTo(map);

//Custom map icons
const kaliIcon = L.icon({
  iconUrl: "images/map-icon.png", 
  iconSize: [38, 38],     
  iconAnchor: [19, 38],   
  popupAnchor: [0, -38]   
});

//Fetch project coordinates from JSONBin API
async function loadNetworkLocations() {
  try {
    // LOADING STATE: 
    statusBox.textContent = "Loading live network locations...";
    statusBox.classList.remove("hidden");

    const response = await fetch(JSONBIN_URL);

    // Check if the API request failed
    if (!response.ok) {
      throw new Error("Failed to connect to JSONBin server");
    }

    const data = await response.json();
    const projects = data.record; 

    // EMPTY STATE: 
    if (!projects || projects.length === 0) {
      statusBox.textContent = "No active network deployments found in this region.";
      return;
    }

    // SUCCESS STATE: Loop through the locations and drop a custom marker for each
    projects.forEach((project) => {
      const marker = L.marker([project.lat, project.lng], { icon: kaliIcon }).addTo(map);

      // Popup when the user clicks the marker
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${project.title}</h3>
        </div>
      `);
    });

    // Hide the status overlay 
    statusBox.classList.add("hidden");

  } catch (error) {
    // Error State:
    console.error("Map API Error:", error);
    statusBox.innerHTML = `
      <div>
       <svg class="wifi-loader" viewBox="0 0 120 100" style="width: 70px; height: 60px;">
      <path class="wifi-bar wifi-bar-3" d="M 12 42 A 68 68 0 0 1 108 42" />
      <path class="wifi-bar wifi-bar-2" d="M 28 60 A 45 45 0 0 1 92 60" />
      <path class="wifi-bar wifi-bar-1" d="M 60 92 L 42 74 A 25 25 0 0 1 78 74 Z" />
    </svg>
    <p style="margin-top: 8px;">Loading live network locations...</p>
    `;
  }
}

loadNetworkLocations();