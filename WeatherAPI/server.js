var request = require('request');
var express = require('express');
var argv = require('yargs').argv;
var app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	var apiKey = 'INSERT API KEYS';
	var city = argv.c || 'Brussels';
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

	request(url, function (err, response, body) {
	  if(err){
	   res.render('index', {data: null, error: 'Error, please try again'});
	  	} else {
	   	var data = JSON.parse(body)
			var weatherStatus = `${data.name} : ${data.main.temp}º Celsius`;
			var weatherIcon = `${data.weather[0].icon}`;
	    	res.render('index', {icon: weatherIcon, data: weatherStatus, error: null});
	  	}
	});
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})