var express = require('express');
var bodyParser = require("body-parser");
var index = require('./index.js');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send(index.getPage());  
});
app.post('/', function (req, res) { 
	res.send(index.getPage(req.body));
});
app.listen(3000, function () {	
    console.log('Server weather listening on port 3000!');
});