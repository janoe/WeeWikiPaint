"use strict";
var http = require("http");
var server = require("../../src/server/server.js");
var fs = require("fs");
var assert = require("assert");

var TEST_FILE = "test/generated/test.html";

exports.setUp = function(done) {
    console.log("Setup del test");
    server.start(TEST_FILE,function() {
        console.log("Servidor iniciado");
    });
    done();
};

exports.tearDown = function(done) {
    //Paramos el servidor
    try{
        server.stop(function(){
            //console.log("Servidor parado");
            done();
        });
    }catch(ex){
        if (ex.message === 'Not running'){ //Si el servidor ya estaba parado lo damos por bueno.
            done();
        }
    }
    //Borramos si existe el servidor de test.
    if (fs.existsSync(TEST_FILE)) {
        fs.unlinkSync(TEST_FILE);
        assert.ok(!fs.existsSync(TEST_FILE), "could not deleted test file: [" + TEST_FILE + "]");
	}
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

exports.testServerServesAFile = function(test) {
    //var testDir = "generated/test";
	var testData = "This is served from a file";

	fs.writeFileSync(TEST_FILE, testData);
	var request = http.get("http://" + process.env.IP + ":" + process.env.PORT);
	request.on("response", function(response) {
		var receivedData = false;
		response.setEncoding("utf8");

		test.equals(200, response.statusCode, "status code");
		response.on("data", function(chunk) {
			receivedData = true;
			test.equals(testData, chunk, "response text");
		});
		response.on("end", function() {
			test.ok(receivedData, "should have received response data");
			server.stop(function() {
				test.done();
			});
		});
	});
};

exports.test_serverRequiresFileToServe = function(test) {
    server.stop(function(){
        test.throws(function() {
            server.start();
        });
        test.done();
    });
};