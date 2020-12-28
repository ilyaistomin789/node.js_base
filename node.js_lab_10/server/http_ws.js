const http = require('http');
const WebSocket = require('ws');
const ws_config = require('../config/ws_config');
const http_config = require('../config/http_config');
const server = http.createServer().listen(3000).on('request', http_config.request_handler);
//const ws_server = new WebSocket.Server({port: 4000, host: 'localhost', path: '/ws_server'}).on('connection', ws_config.connection_handler);
const broadcast_ws = new WebSocket.Server({port: 4000, host: 'localhost', path: '/ws_broadcast'}).on('connection', (res) => {
    res.on('message', (message) => {
        broadcast_ws.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(`server: ${message}`);
        })
    })
});
