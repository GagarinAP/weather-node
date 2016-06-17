var express = require('express');
var bodyParser = require("body-parser");
var index = require('./index.js');
var server = express();

//server.use(express.bodyParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', function (req, res) {
  res.send(index.getPage());  
});

server.post('/', function (req, res) {
  /*customer_name = req.body.customer_name;
  weather = req.body.weather;
  console.log(customer_name);
		console.log(weather);*/
  res.send(index.getPage(req.body));
});

server.listen(8080, function () {	
  console.log('Server weather listening on port 8080!');
});