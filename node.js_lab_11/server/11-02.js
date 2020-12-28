const ws = require('ws');
const fs = require('fs');
const wsServer = new ws.Server({host: 'localhost', port:4000, path:'/wsServerDownload'});

wsServer.on('connection', (message) => {
    const duplex = ws.createWebSocketStream(message, {encoding: 'utf-8'});
    let rfile = fs.createReadStream(`./download/firstfile.txt`)
    rfile.pipe(duplex)
})
