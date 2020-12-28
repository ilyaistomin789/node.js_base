const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;

const client = new net.Socket();
const buf = Buffer.alloc(4);
let timer = null;

client.connect(PORT, HOST, () => {
  console.log(`Client ${HOST}:${PORT} connected`);
  let k = 0;
  timer = setInterval(() => {
    client.write((buf.writeInt32LE(k++, 0), buf));
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    client.end();
  }, 20000);
});

client.on('data', (data) => {
  console.log(`Client received: ${data.readInt32LE()}`);
});

client.on('close', () => console.log('Client closed'));
client.on('error', (e) => console.log('Client error', e));
