const WebSocket = require('ws');
const fs = require('fs');
const crypto = require('crypto');
const wsServer = new WebSocket.Server({host: 'localhost', port:4000, path:'/wsServerFile'});
wsServer.on('connection', (message) => {
    const id = crypto.randomBytes(16).toString('hex');
    const wsStream = WebSocket.createWebSocketStream(message, {encoding: 'utf-8'});
    wsStream.pipe(fs.createWriteStream(`./upload/${id}.txt`));
    console.log(`File was copied to directory. Path /upload/${id}.txt`);
})
