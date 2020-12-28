const WebSocket = require('ws');
let count = 0;
let sum = 0;
const wsServer = new WebSocket.Server({host: 'localhost', port: 4000, path:'/pingpong'});
wsServer.on('connection', (message) => {
    setInterval(() => {message.send(`11-03-server: ${++count}`)},7000);
})

