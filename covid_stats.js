// Get the COVID-19 Statistics from RapidAPI
fetch("https://covid-19-statistics.p.rapidapi.com/reports?date=2020-04-16", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "70a1417856msh303faf5b26b3b15p1a4004jsn7a7f7cd83db0",
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});