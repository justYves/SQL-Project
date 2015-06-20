var express = require("express");
var router = express.Router();

var file = "imdb-large.sqlite3.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

var queries = function(){
	
}