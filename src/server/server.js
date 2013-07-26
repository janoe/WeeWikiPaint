"use strict";

var http = require("http");
var fs = require("fs");
var server;


exports.start = function(fileToServe) {
    if (!fileToServe) throw "File to serve is required";

    server = http.createServer();
    server.listen(process.env.PORT);
    console.log("Server started and awaiting connections");

    server.on("request", function(request, response) {
        console.log("Received request");
        fs.readFile(fileToServe, function (err, data) {
            if (err) throw err;
            console.log("Data: " + data);
            response.end(data);
        });
    });
};

exports.stop = function(callback) {
    server.close(callback);
};

