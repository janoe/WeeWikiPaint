"use strict";
var http = require("http");
var server = require("../../src/server/server.js");

exports.setUp = function(done) {
    console.log("setUp");
    server.start(function() {
        console.log("Servidor iniciado");
    });
    done();
};

exports.tearDown = function(done) {
    console.log("Teardown");
    done();
};

exports.testHttpServerIsWorking = function(test) {
    http.get("http://" + process.env.IP + ":" + process.env.PORT, function(response) {
        test.equals(200, response.statusCode, "status code");
        console.log("Response: " + response.data);
        response.setEncoding("utf8");
        response.on("data", function(chunk) {
            console.log("Data processing" + chunk);
            test.equals("Hello World", chunk, "response data");
            server.stop(function() {
                console.log("Servidor parado");
            }); //Paramos el servidor
            test.done();
        });
    });
};

exports.testServerRunsStopCallBackWhenStopCompletes = function(test) {
    server.stop(function() {
        console.log('ServerRunsStopCallBackWhenStopCompletes');
        test.done();
    });
};

exports.testStopCalledWhenServerIsntRunningThrowsException = function(test) {
    server.stop(function() {
        console.log('El servidor ha parado');
        test.throws(function() {
            server.stop();
        });
        test.done();
    });
};

