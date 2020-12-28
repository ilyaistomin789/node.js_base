const fs = require('fs');
const Websocket = require('ws');
const crypto = require('crypto');
const wsClient = new Websocket('ws://localhost:4000/wsServerDownload');
wsClient.on('open', () => {
    const id = crypto.randomBytes(16).toString('hex');
    const wsStream = Websocket.createWebSocketStream(wsClient,{encoding: 'utf-8'});
    const wfile = fs.createWriteStream(`./downloaded/${id}.txt`);
    wsStream.pipe(wfile);
})

