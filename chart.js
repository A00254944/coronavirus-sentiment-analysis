// Get the polarity and the subjectivity and send the data to chart 1
function getDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);

			var chartArray = [];

			for (var i = 0; i < data.length; i++) {
				var chartData = {
					x: data[i].polarity,
					y: data[i].subjectivity
				}

				chartArray.push(chartData);
			}

			chart1(chartArray);
		}
	};
	xhttp.open("GET", "http://localhost:5000/", true);
	xhttp.send();
}

// Get the symptoms and the tweet count that contains those symptoms and send the data to chart 2
function getDoc2() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);

			var symptomArray = [];
			var tweetCountArray = [];

			for (var i = 0; i < data.length; i++) {
				symptomArray.push(data[i].description);
				tweetCountArray.push(data[i].count);
			}

			chart2(symptomArray, tweetCountArray);
		}
	};
	xhttp.open("GET", "http://localhost:5000/2", true);
	xhttp.send();
}

// Create chart 1
var chart1 = function (chartArray) {
	var ctx1 = document.getElementById("chart_1").getContext("2d");
	Chart.defaults.global.defaultFontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
	Chart.defaults.global.defaultFontSize = 20;
	new Chart(ctx1, {
		type: "scatter",
		data: {
			datasets: [
				{
					label: "COVID-19 Sentiment",
					backgroundColor: "rgb(255, 153, 153)",
					borderColor: "rgb(0, 0, 0)",
					data: chartArray,
					order: 1
				}
			],
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
						scaleLabel: {
							labelString: "Subjectivity",
							display: true
						},
					},
				],
				xAxes: [
					{
						scaleLabel: {
							labelString: "Polarity",
							display: true
						},
					},
				],
			},
		},
	});
}

// Create chart 2
var chart2 = function (symptomArray, tweetCountArray) {
	var ctx2 = document.getElementById("chart_2").getContext("2d");
	Chart.defaults.global.defaultFontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
	Chart.defaults.global.defaultFontSize = 20;
	new Chart(ctx2, {
		type: "bar",
		data: {
			datasets: [
				{
					label: "COVID-19 Symptoms",
					backgroundColor: "rgb(255, 153, 153)",
					borderColor: "rgb(0, 0, 0)",
					data: tweetCountArray,
					order: 2
				},
			],
			labels: symptomArray,
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							max: 100,
							stepSize: 25
						},
						scaleLabel: {
							labelString: "Tweet Count",
							display: true
						},
					},
				],
				xAxes: [
					{
						scaleLabel: {
							labelString: "Symptoms",
							display: true
						},
					},
				],
			},
		},
	});
}

getDoc();
getDoc2();