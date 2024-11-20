/* eslint-disable */
// Get the locations data from HTML dataset
const locations = JSON.parse(document.getElementById('map').dataset.locations);

// Initialize the map with Leaflet
const map = L.map('map', {
  zoom: 10, // Initial zoom level
  scrollWheelZoom: false, // Disable scroll zoom
});

// Add OpenStreetMap tile layer (you can replace it with any other tile provider if needed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Define the bounds to include all markers
const bounds = L.latLngBounds(); // Correct usage of Leaflet's latLngBounds

// Loop through locations to add markers and popups
locations.forEach((loc) => {
  // Swap the coordinates (Lng, Lat) to (Lat, Lng) for Leaflet
  const latLng = [loc.coordinates[1], loc.coordinates[0]]; // [Lat, Lng]

  // Create a marker for each location
  const marker = L.marker(latLng).addTo(map);

  // Add a popup to the marker
  marker.bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`);

  // Extend the bounds to include the current marker's coordinates
  bounds.extend(latLng);
});

// Adjust map to fit bounds including all markers
map.fitBounds(bounds, {
  padding: [100, 100], // Padding around the map
});
