'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const API_KEY = require('./apiKey');
//Need to install npm install node-fetch
//https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined
var fetch = require("node-fetch");
//Need to install npm-xmlhttprequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
//Database
var mongo = require('mongodb');
const app = express();
var user;
//Module importieren
var newUser = require('./database/newUser');
var fetchAPI = require('./fetchAPI');
var date = require("./date");



app.set('port', 3000);
//Erlaub die Verarbeitung von Daten//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes//
app.post('/webhook', async (request, response) => {
	// Hier kommt der Request von Webhook rein
  	const requestBody = request.body.queryResult;
	//Eindeutige User-Identifizierung
	var user = request.body.originalDetectIntentRequest.payload.recipient.id;
	console.log('Die User-ID lautet: '+user);
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
		var apiPath = 'http://api.openweathermap.org/data/2.5/weather?q='+requestBody.parameters['geo-city']+'&units=imperal&appid=3075ade1e14052f065f6aaf86bb84876';
		console.log('API-Pfand: '+apiPath);
		// JSON Call nach diesem Link https://www.w3schools.com/xml/dom_httprequest.asp
		loadXMLDoc();
		function loadXMLDoc() {
  			var xhttp = new XMLHttpRequest();
  			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				console.log("Response: "+this.responseText);
				// Daten in data abspeichern und parsen nach: https://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
				let data = JSON.parse(this.responseText);
				console.log("Data: "+data);
				// Anlegen des Antwortobjektes nach https://developers.google.com/actions/reference/v1/dialogflow-webhook
				let answer = {
					"fulfillmentText":"The weather in "+data.name+" is "+data.weather[0].description+"!",
					"fulfillmentText":"The weather in "+data.name+" is "+data.weather[0]+"!"
				};
				response.send(answer);
				}
  			};
			xhttp.open("GET", apiPath, true);
			xhttp.send();
		}
	}else if(requestBody.action === 'getUni'){
		console.log('Es wurde nach dem Unitermin gefragt');
		//Einloggen
		fetch('https://hsrm-medialab.de/osp/server/functions.php', {
            	method: 'POST',
            	body: "request=login&timsdafestamp=152872580addasf1999&edasfditor=anonymous&user=bmm3&password=hsrm-2018",
            	headers: {
                	'Connection': 'keep-alive',
                	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Credentials': 'include',
					'cookie':"PHPSESSID=465566a75b4eaa90ddd39f90157f8d33"
            	}
		})
		console.log(requestBody);
		// Die Stadt wird aus dem Request entnommen und in die AnfrageURL gesetzt
		var apiPath = 'https://hsrm-medialab.de/osp/server/functions.php';
		//Datum verarbeiten
		var myDate = new Date(requestBody.parameters.date);
		var timestamp = myDate.getTime() / 1000;
		console.log(myDate);
		var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		var dayName = days[myDate.getDay()];
		console.log(dayName);
		//Get WeekNumber https://gist.github.com/dtomasi/edc8d67a540ff71fb2d7339f23163596
		Date.prototype.getWeek = function() {
  			var jan4th = new Date(this.getFullYear(),0,4);
  			return Math.ceil((((this - jan4th) / 86400000) + jan4th.getDay()+1)/7);
		}
		var weekNumber = myDate.getWeek();
		console.log("Wochennummer: "+weekNumber);
		//
		var params ="request=get-eventdata&timestamp="+timestamp+"&editor=user&kw=kw"+weekNumber+"&program=bmm&target="+requestBody.parameters.class;
		console.log("Der Request lautet: "+params);
		fetch('https://hsrm-medialab.de/osp/server/functions.php', {
            	method: 'POST',
            	body: params,
            	headers: {
                	'Connection': 'keep-alive',
                	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Credentials': 'include',
					'cookie':"PHPSESSID=465566a75b4eaa90ddd39f90157f8d33"
            	}
		})
		
		
  			.then((response) => response.json())
			.then((responseJSON)=>{
				console.log(responseJSON);
				var i = 0;
				var courseS = [];
				for (i=0; i<responseJSON.events.length; i++){
					var woche = responseJSON.events[i];
					var lecture = responseJSON.events[i].day;
					if (lecture == dayName){
						var course = woche.course;
						console.log(course);
						switch (course){
							case "BMM_2013_LV_2202b":
								course = "Unternehmensführung II";
								break;
							case "BMM_2013_LV_2102a":
								course = "Projektmanagement";
								break;
							case "BMM_2013_LV_1802b":
								course = "Medienmarketing II";
								break;
							case "BMM_2013_LV_1904":
								course = "Design- und Medientheorie";
								break;
							case "BMM_2013_LV_1702b":
								course = "Organisationsmanagement";
								break;
							case "BMM_2013_LV_2202a":
								course = "Unternehmensführung I";
								break;
							case "BMM_2013_LV_2102b":
								course = "Wissenschaftliches Arbeiten";
								break;
							case "BMM_2013_LV_2102b":
								course = "Wissenschaftliches Arbeiten";
								break;
							case "BMM_2013_LV_1702b":
								course = "Organisationsmanagement";
								break;
							case "BMM_2013_LV_2002b":
								course = "Organisationsmanagement";
								break;
							case "BMM_2013_LV_1906":
								course = "Designmanagement";
								break;
							case "BMM_2013_LV_1904":
								course = "Designmanagement";
								break;
							case "BMM_2013_LV_3100":
								course = "Berufspraktikum";
								break;
							case "BMM_2013_LV_0001":
								course = "Sondertermin";
								break;
							case "BMM_2017_LV_1602a":
								course = "Design 1";
								break;
							case "BMM_2017_LV_1402a":
								course = "Webtechnologien I";
								break;
							case "BMM_2017_LV_1102a":
								course = "Medienwirtschaft 1";
								break;
							case "BMM_2017_LV_1202a":
								course = "IKT II";
								break;
							case "BMM_2017_LV_1502a":
								course = "Bild- und Tontechnik I";
								break;
							case "BMM_2017_LV_1302b":
								course = "Recht II";
								break;
							case "BMM_2017_LV_1102b":
								course = "Medienwirtschaft II";
								break;
							case "BMM_2017_LV_1302a":
								course = "Recht I";
								break;
							case "BMM_2017_LV_1102c":
								course = "Medienwirtschaft III";
								break;
							case "BMM_2017_LV_1702c":
								course = "Medienwirtschaft III";
								break;
							case "BMM_2017_LV_1402b":
								course = "Webtechnologien II";
								break;
							case "BMM_2017_LV_1502b":
								course = "Bild- und Tontechnologie II";
								break;
							case "BMM_2017_LV_1602b":
								course = "Design II";
								break;
							case "BMM_2017_LV_1802a":
								course = "Finanz- und Rechnungswesen I";
								break;
							case "BMM_2017_LV_1902a":
								course = "Medienmarketing I";
								break;
								
									  }
						courseS.push(course);
					};
				};
				if(courseS.length < 1){
				response.setHeader('Content-Type','application/json');
				response.send(JSON.stringify({
						"fulfillmentText":"Du hast an diesem Tag keine Vorlesungen. Genieße den Tag!",
				}));
				}else{	
				response.setHeader('Content-Type','application/json');
				response.send(JSON.stringify({
                        "fulfillmentText":"Du hast an diesem Tag diese Vorlesung "+courseS+".",
                    }));
				}
				
				})	
			.catch((error)=>{
				console.log(error);
  			});
	}else{
			let answer = {
					"speech":"Bidde nochmal!",
					"displayText":"Bidde nochmal!"
				};
				response.send();
		}
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


