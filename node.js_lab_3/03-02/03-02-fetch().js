const fs = require('fs');
const http = require('http');
const url = require('url');
const fact = (n) => {return (n != 1) ? n * fact(n - 1) : 1};
const server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/fact'){
        if (url.parse(req.url,true).query['k'] != 'undefined'){
            let k = parseInt(url.parse(req.url,true).query['k']);
            if (Number.isInteger(k)){
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({k:k,fact:fact(k)}));
            }
        }
    }
    if (url.parse(req.url).pathname === '/'){
        const factFile = fs.readFileSync('03-02/factHTML.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(factFile);
    }
}).listen(5000)
console.log('http://localhost:5000/');