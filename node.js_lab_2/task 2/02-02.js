const fs = require('fs');
const http = require('http');
const image = fs.readFileSync('task 2/img.png')
http.createServer(function (request, response){
    if (request.url === "/png")
    {
        console.log("Request method: " + request.method);
        response.setHeader("Content-Type", "image/png");
        response.write(image);
        response.end();
    }
}).listen(5000);