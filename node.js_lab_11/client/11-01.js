const fs = require('fs');
const WebSocket = require('ws');
const wsClient = new WebSocket('ws://localhost:4000/wsServerFile');
wsClient.on('open', () => {
    const wsStream = WebSocket.createWebSocketStream(wsClient, {encoding: 'utf-8'});
    const file = fs.createReadStream('./components/1101File.txt');
    file.pipe(wsStream);
});
