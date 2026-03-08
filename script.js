// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map centered roughly on Mauldin, SC
  var map = L.map("map").setView([34.778, -82.310], 16); // zoom level 16 is good for property

  // Add free OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Load tree data from trees.json
  fetch("trees.json")
    .then(response => response.json())
    .then(trees => {
      trees.forEach(tree => {
        // Create marker
        var marker = L.marker([tree.lat, tree.lng]).addTo(map);
        
        // Popup content
        var popupContent = `
          <b>${tree.species}</b><br>
          ID: ${tree.id}<br>
          Tags: ${tree.tags.join(", ")}<br>
          Notes: ${tree.notes}
        `;
        
        marker.bindPopup(popupContent);
      });
    })
    .catch(error => console.error("Error loading trees:", error));
});
