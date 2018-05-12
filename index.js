'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', 3000);
//Erlaub die Verarbeitung von Daten//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes//
app.get('/',function(req,res){
		res.send("HI");
});

app.get('/webhook/',function(req,res){
	if (req.query['hub.verify_token']==="mahalo"){
		res.send(req.query['hub.challenge']);
	}else{
		res.send("Wrong Token");	
	};
});

app.listen(app.get('port'),function(){
	console.log("Server is listening on Port"+app.get('port'));
});
