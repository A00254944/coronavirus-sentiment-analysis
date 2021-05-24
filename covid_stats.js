// Get the COVID-19 Statistics from RapidAPI
fetch("https://covid-19-statistics.p.rapidapi.com/reports?date=2020-04-16", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "",
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
