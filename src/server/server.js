"use strict";

var http = require("http");
var server;

exports.start = function() {
    server = http.createServer();
    server.listen(process.env.PORT);
    console.log("Server started and awaiting connections");

    server.on("request", function(request, response) {
        console.log("Received request");
        var body = "Hello World";
        response.end(body);
    });
};

exports.stop = function() {
    server.close();
};
