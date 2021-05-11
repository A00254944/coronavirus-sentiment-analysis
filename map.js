var dataArray = [];

// Create the map
mapboxgl.accessToken = 'pk.eyJ1IjoiYTAwMjU0OTQ0IiwiYSI6ImNrb2lqcDNwdzBsbmkycHMxMGttYnBkZnYifQ.hc3pjTMarWADlcDLsWVnuA';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 1.5
});

// Get the data and set the markers using the data
function getDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	   	var data = JSON.parse(this.responseText);

		dataArray = data.data;

		for (var i = 0; i < dataArray.length; i++) {
			var dataRegion = dataArray[i].region;

			newMarker(dataRegion.long, dataRegion.lat, dataArray[i].confirmed);
		}
	  }
	};
	xhttp.open("GET", "covid_stats.json", true);
	xhttp.send();
}

// Get the color depending on the infection count
const getColorFromCount = count => {
	if (count >= 100) {
		return "red";
	}
	if (count >= 10) {
		return "blue";
	}
	else {
		return "gray";
	}
}

// Create a new marker on the map
function newMarker(longitude, latitude, infected) {
	new mapboxgl.Marker({
		color: getColorFromCount(infected)
	})
	.setLngLat([longitude, latitude])
	.addTo(map);
}

// Get the data when the page has fully loaded
window.onload = function() {
	getDoc();
}

