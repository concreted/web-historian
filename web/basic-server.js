var http = require("http");
var handler = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// var express = require('express');
// var app = express();

// var handler = require('./request-handler');

// app.get('/', handler.handleRequest)

// var server = app.listen(8080, function() {
//     console.log('Listening on port %d', server.address().port);
// });

