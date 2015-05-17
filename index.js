var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.use(express.static('app/static'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});