
function updateSelectedYear(value) {
    document.getElementById('selected-year').innerHTML = value;
}


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function guess() {

    const selectedYear = document.getElementById('selected-year').innerHTML;
    const currentPin = getCurrentPin(); // Assuming you have a function to get the current pin from OpenStreetMap
    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: localStorage.getItem('description'),
            distance: calculateDistance(currentPin.lat, currentPin.lng, localStorage.getItem('long'), localStorage.getItem('lat')),
            year: localStorage.getItem('year'),
            lat: localStorage.getItem('lat'),
            long: localStorage.getItem('long'),
            min_lat: localStorage.getItem('min_lat'),
            max_lat: localStorage.getItem('max_lat'),
            min_long: localStorage.getItem('min_long'),
            max_long: localStorage.getItem('max_long'),
            selectedYear: selectedYear,
            pinLat: currentPin.lat,
            pinLong: currentPin.lng,
            level_name: localStorage.getItem('level_name')

        })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
    .catch(error => console.error('Error:', error));  if (response.redirected) {
            window.location.href = response.url;
        }
    }

// Initialize the map
var map = L.map('map').setView([37.7749, -122.4194], 13); // Example: San Francisco, CA

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Handle resizing of the map on hover
var mapContainer = document.getElementById('map');

mapContainer.addEventListener('mouseenter', function() {
    setTimeout(function() {
        map.invalidateSize();
    }, 300); // Wait for the CSS transition to finish before invalidating the size
});

mapContainer.addEventListener('mouseleave', function() {
    setTimeout(function() {
        map.invalidateSize();
    }, 300); // Recalculate the size again when the map returns to its original size
});
    // Variable to store the current marker
    var currentMarker = null;

    // Add event listener to the map to handle click events
    map.on('click', function(e) {
    // Remove the existing marker from the map
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Add a new marker at the clicked location and store it in currentMarker
    currentMarker = L.marker(e.latlng).addTo(map);
});

    // Function to get the current pin's location
    function getCurrentPin() {
        if (currentMarker) {
            return currentMarker.getLatLng(); // Returns an object with lat and lng properties
        } else {
            return null; // No marker has been placed yet
        }
    }

    function returnToHomepage() {
        console.log('Returning to homepage...');
        window.location.href = '/';
    }




