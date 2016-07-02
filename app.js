const express = require('express');
const _ = require('lodash-node');
const bodyParser = require('body-parser');
const indexPage = require('./views/indexPage.js');
const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(req,res){
	res.send(indexPage.getPage());
});
app.post('/', function(req,res){
	res.send(indexPage.getPage(req.body));
});


app.listen(3000, function(){
	console.log('Server up in 3000 port!');
});