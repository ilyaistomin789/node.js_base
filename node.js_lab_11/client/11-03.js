const WebSocket = require('ws');
const wsClient = new WebSocket('ws://localhost:4000/pingpong');
wsClient.on('message', (message) => {
    console.log(message);
})
wsClient.on('pong', (data) => {
    console.log(`on pong: ${data.toString()}`);
})
setInterval(() => {wsClient.ping('client: ping')},5000)
