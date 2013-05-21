var http = require("http");

var server = http.createServer();

server.on("request", function(request, response) {
    console.log("Received request");

    var body = "<html><head><title>HTML Spkie test</title></head><body>This is a node's HTTP server</body></html>";

    response.end(body);
}

);

server.listen(process.env.PORT);
console.log("Server started and awaiting connections");