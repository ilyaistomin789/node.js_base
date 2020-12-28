const WebSocket = require('ws');
let k = 0;
//const ws = new WebSocket('ws://localhost:4000/ws_server');
const ws = new WebSocket('ws://localhost:4000/ws_broadcast');
ws.on('open', () => {setInterval(() => {ws.send(`10-01-client: ${++k}`);},3000)});
ws.on('message',(message) => {console.log(`${message}`)});
