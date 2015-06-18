var express = require("express");
var app = express();
var routes = require("./routes");

app.use(routes);

app.listen(3000,function(){
	console.log("Server is listening port 3000");
})