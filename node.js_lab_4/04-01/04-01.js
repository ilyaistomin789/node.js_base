const http = require('http');
const fs = require('fs');
const url = require('url');
const data = require('./db');
const database = new data.DB();
database.on('GET', (req,res) => {res.end(JSON.stringify(database.get()))});
database.on('POST', (req,res) => {
    req.on('data', (data) => {
        let r = JSON.parse(data);
        database.post(r);
        res.end(JSON.stringify(r));
    })
})
database.on('PUT', (req,res) => {
    req.on('data', (data) => {
        let r = JSON.parse(data);
        database.put(r);
        res.end(JSON.stringify(r));
    })
})
database.on('DELETE', (req,res) => {
    req.on('data', (data) => {
        database.delete(Number.parseInt(data));
        res.end(data);
    })
})
const server = http.createServer(((req, res) => {
    if (url.parse(req.url).pathname === '/'){
        const html = fs.readFileSync('04-01/main.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
    if (url.parse(req.url).pathname === '/api/db'){
        database.emit(req.method, req, res);
    }
})).listen(5000);