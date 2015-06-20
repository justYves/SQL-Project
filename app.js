var express = require("express");
var app = express();

var fs = require("fs");
var swig = require("swig");



swig.setDefaults({ cache: false });

app.listen(3000,function(){
	console.log("Server is listening port 3000");
})

app.engine("html", swig.renderFile)
app.set("views",__dirname + "/views")
app.set("view engine","html")


var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require("./routes");
app.use(routes);