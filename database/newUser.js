var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*function addUser(name,identifiyer){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("myUsers");
	  var myobj = { name: name, address: identifiyer};
	  dbo.collection("customers").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	  });
	});
};*/

