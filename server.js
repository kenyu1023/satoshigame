var express = require('express');
var app = express();
var http = require('http').Server(app);
var POST = process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/public/'));
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

http.listen(POST, function() {
    console.log('Server running :', POST);
});