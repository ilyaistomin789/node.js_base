const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;

const client = new net.Socket();
client.connect(PORT, HOST, () => console.log(`Client ${HOST}:${PORT} connected`));

client.write('Hello from client');

client.on('data', (data) => {
  console.log(`Client received: ${data.toString()}`);
});

client.on('close', () => console.log('Client closed'));
client.on('error', (e) => console.log('Client error', e));
