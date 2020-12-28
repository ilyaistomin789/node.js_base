const WebSocket = require('ws');
const wsClient = new WebSocket('ws://localhost:4000/jsonMessage');
let k = 0;
wsClient.on('open', () => {
    setInterval(() => {wsClient.send(JSON.stringify({client:++k, timestamp:new Date().toString()}));}, 3000)
})
wsClient.on('message', (message) => {
    console.log(`SERVER: ${message}`);
})
