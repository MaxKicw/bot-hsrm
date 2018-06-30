
//Dieses Modul liefert einen Array in dem alle wichtigen Datenformate, bezüglich des Responses enthalten sind.
//Funktionsweiße: date.getDate(requestBody)
//Rückgabe: Ein array namens dates=[timestamp,dayName,weekNumber]

function getDate(requestBody){
		var dates = [];
		var myDate = new Date(requestBody.parameters.date);
		var timestamp = myDate.getTime() / 1000;
		var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		var dayName = days[myDate.getDay()];
		//Get WeekNumber https://gist.github.com/dtomasi/edc8d67a540ff71fb2d7339f23163596
		Date.prototype.getWeek = function() {
  			var jan4th = new Date(this.getFullYear(),0,4);
  			return Math.ceil((((this - jan4th) / 86400000) + jan4th.getDay()+1)/7);
		}
		var weekNumber = myDate.getWeek();
		dates.push(timestamp);
		dates.push(dayName);
		dates.push(weekNumber);
		return dates;
};

module.exports.getDate = getDate;