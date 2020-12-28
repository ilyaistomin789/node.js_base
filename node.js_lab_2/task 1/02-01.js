const http = require('http');
const fs = require('fs');
const info = fs.readFileSync('task 1/index.html');
http.createServer(function (request,response){
    if(request.url === "/html")
        response.setHeader('Content-Type', 'text/html')
    response.end(info,'utf-8',()=>{console.log("The message is displayed successfully.")});
}).listen(5000);
