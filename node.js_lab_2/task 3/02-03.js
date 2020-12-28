const http = require('http');
const fs = require('fs');
const info = fs.readFileSync('task 3/name.txt');
http.createServer(function (request, response) {
    if (request.url === '/api/name'){
        response.setHeader("Content-Type", "text/plain");
        response.write(info, 'utf-8',() => {console.log('response.write() 02.03.js')});
        response.end();
    }
}).listen(5000);