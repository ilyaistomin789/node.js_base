const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('task 5/fetch.html');
const info = fs.readFileSync('task 3/name.txt');
http.createServer(function (request,response){
    if (request.url === '/api/name'){
        response.setHeader("Content-Type", "text/plain");
        response.end(info);
    }
    if (request.url === '/fetch'){
        response.contentType = 'text/html';
        response.end(file,'utf-8', () => {console.log('The response was output')});
    }
}).listen(5000);
console.log('Server is working(fetch): http://localhost:5000/fetch');