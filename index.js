'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const API_KEY = require('./apiKey');
//Need to install npm-xmlhttprequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

const app = express();

app.set('port', 3000);
//Erlaub die Verarbeitung von Daten//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes//

app.post('/webhook', async (request, response) => {
	// Hier kommt der Request von Webhook rein
  	const requestBody = request.body.result
  	console.log(requestBody)
	// Hier wird zwischen dem Intent entschieden. Sucht er ein Event oder will er das Wetter
	if(requestBody.action === 'getEvent'){
		console.log("Es wird nach einem "+requestBody.parameters.genre+" Event gesucht!");
		let answer = {
			"speech":"Hallo",
			"displayText":"Hallo"
		};
		response.send(answer);
	}else if(requestBody.action === 'getWeather'){
		console.log('Es wurde nach dem Wetter gefragt!');
		// Die Stadt wird aus dem Request entnommen und in die AnfrageURL gesetzt
		var apiPath = 'http://api.openweathermap.org/data/2.5/weather?q='+requestBody.parameters.city+'&units=imperal&appid=3075ade1e14052f065f6aaf86bb84876';
		console.log('API-Pfand: '+apiPath);
		// JSON Call nach diesem Link https://www.w3schools.com/xml/dom_httprequest.asp
		loadXMLDoc();
		function loadXMLDoc() {
  			var xhttp = new XMLHttpRequest();
  			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				console.log("Response: "+this.responseText);
				// Daten in data abspeichern und parsen nach: https://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
				let data = this.responseText;
				console.log("Data: "+data);
				// Anlegen des Antwortobjektes nach https://developers.google.com/actions/reference/v1/dialogflow-webhook
				let answer = {
					"speech":"The weather in "+data.name+" is "+data.weather[0].description+"!",
					"displayText":"The weather in "+data.name+" is "+data.weather[0]+"!"
				};
				response.send(answer);
				}
  			};
			xhttp.open("GET", apiPath, true);
			xhttp.send();	
		}
	};
});

app.get('/',function(req,res){
	res.send("Hi");
});

//API//
var apiKey = "3075ade1e14052f065f6aaf86bb84876";
//Listening//
app.listen(app.get('port'),function(){
	console.log("Server is listening on Port"+app.get('port'));
});


