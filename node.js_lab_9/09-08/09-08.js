const http = require('http');
const fs = require('fs');
const options = {
    host: 'localhost',
    path: `/png`,
    port: 5000,
    method: 'GET'
}
const file = fs.createWriteStream('./09-08/png/fromClient.png');
const req = http.request(options,(res) => res.pipe(file));
req.on("error", (e) => console.log(e.message));
req.end();
