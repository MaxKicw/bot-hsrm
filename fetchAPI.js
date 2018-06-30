const request = require('request');
var fetch = require("node-fetch");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

//Modul zum versenden von API-Anfragen über fetch.
//Funktionsweiße: fetchAPI.fetch(URL,bodyparameter)
//Rückgabe: Der Response der API

function anfrage(url,params,dates){
	//Login davor für irgendwas, damit die Session eröffnet wird
	fetch(url, {
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
					if (lecture == dates[1]){
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
};


//Export der Module
module.exports.anfrage = anfrage;