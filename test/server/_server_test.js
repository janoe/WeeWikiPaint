
"use strict";
var http = require("http");
var server = require("../../src/server/server.js");

exports.tearDown = function(done){
    console.log("begin Teardown");
    server.stop(function(){
        console.log("Servidor parado");
    }); //Paramos el servidor
    console.log("End teardown");
    done();
};

exports.testHttpServerIsWorking = function(test){
    console.log("Iniciamos servidor");
    server.start(function(){
        console.log("Servidor iniciado");
    });
    console.log("Llamamos al http");
    http.get("http://" + process.env.IP + ":" + process.env.PORT,function(response){
        console.log("testHttpServerIsWorking ha ido Ok" + response.status);
        response.on("data",function(){
            console.log("Data processing");
            test.done();
        });
    });
};
