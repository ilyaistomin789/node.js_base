const WebSocket = require('ws');
const wsServer = new WebSocket.Server({host: 'localhost',port:4000, path:'/jsonMessage'})
let k = 0;
wsServer.on('connection',(ws) => {
    ws.on('message', (message) => {
        console.log(`CLIENT: ${message}`);
        const json_mes = JSON.parse(message);
        ws.send(JSON.stringify({k:++k,client:json_mes["client"],timestamp: new Date().toString()}));
    })
})
