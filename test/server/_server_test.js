
"use strict";
var http = require("http");
var server = require("../../src/server/server.js");

exports.testHttpServerIsWorking = function(test){
    server.start();
    http.get("http://" + process.env.IP + ":" + process.env.PORT,function(){
        server.stop(); //Si todo Ok paramos el servidor
    });
    test.done();
};
