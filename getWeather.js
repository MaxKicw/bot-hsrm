//WIP

module.exports = {
	getWeather: function getWeather(requestBody){
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
									"speech":"The weather in "+data.name+" is "+data.weather[0].description+"!",
									"displayText":"The weather in "+data.name+" is "+data.weather[0]+"!"
								};
								response.send(answer);
								}
							};
							xhttp.open("GET", apiPath, true);
							xhttp.send();	
						}
	} 
};

