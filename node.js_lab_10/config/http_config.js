const url = require('url');
const fs = require('fs');
const request_handler = (req, res) => {
    if (url.parse(req.url).pathname === '/start' && req.method === 'GET'){
        res.end(fs.readFileSync('./components/html/10-01.html'));
    }
    else {
        res.statusCode = 400;
        res.end(`Status Code: ${res.statusCode}`);
    }
}
module.exports = {request_handler};
