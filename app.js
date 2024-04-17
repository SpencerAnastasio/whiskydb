var bPar    = require('body-parser');
var express = require('express');
var http    = require('http');
var ejs     = require('ejs');
var fs      = require('fs');

var app = express();
var url = "127.0.0.1";
var uPar = bPar.urlencoded({extended: false});
var residents = {dogs: ['Pete', 'Ollie'], humans: ['Spencer', 'Erin']};
var flavorNotes = {nose: ['peat smoke', 'malted barley', 'cardamom'], palate: ['smoke', 'citrus', 'iodine'], finish: ['brine', 'citrus', 'chocolate']};
// __dirname is the servers directory

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/css', express.static('css'));
app.use('/', function(req, res, next){
  console.log('Request was made: ' + req.url);
  console.log("Query: " + JSON.stringify(req.query));
  next();
});

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/contact', function(req, res){
  res.render('contact.ejs');
});

app.get('/whisky', function(req, res){
  res.render('whisky.ejs');
});

app.post('/whisky/*', uPar, function(req, res){
  console.log(JSON.stringify(req.body));
  res.render('whiskyProfile.ejs', {whisky: req.body.whisky, person: residents.humans, notes: flavorNotes});
});

// app.post('/whisky/:name', function(req, res){
//   res.render('whiskyProfile.ejs', {whisky: req.params.name, person: residents.humans, notes: flavorNotes});
// });

app.listen(3000);
console.log(`View Localhost '${url}' in the browser.`);
console.log('Listening on PORT 3000:');
