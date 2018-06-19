//WIP

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