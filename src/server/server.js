"use strict";

var http = require("http");
var fs = require("fs");
var server;

function sendFile(response , file){
                fs.readFile(file, function (err, data) {
                if (err) throw err;
                console.log("Data: " + data);
                response.end(data);
            });
}

exports.start = function(homePagefileToServe,page404FileToServe, portNumber){
    if (!homePagefileToServe) throw "File to serve is required";
    if (!portNumber) throw "Port number is required";

    server = http.createServer();
    server.listen(process.env.PORT);
    console.log("Server started and awaiting connections");

    server.on("request", function(request, response) {
        console.log("Received request");
        if (request.url === '/' || request.url === '/index.html'){
            sendFile(response, homePagefileToServe);
        }else{
            response.statusCode = 404;
            sendFile(response, page404FileToServe);
        }
    });
};

exports.stop = function(callback) {
    server.close(callback);
};

