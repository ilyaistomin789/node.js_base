const http = require('http');
const config = require('../config/config')(5000);
const http_config = require('../config/http-config');
const server = http.createServer()
    .listen(5000)
    .on('error', err => {console.log(err.message)})
    .on('request', http_config.http_handler);
