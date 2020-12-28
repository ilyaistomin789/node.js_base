const http = require('http');
const http_config = require('../config/http-config');
http.createServer().listen(5000).on('request', http_config.config);
