const net = require('net');

const HOST = '127.0.0.1';
const PORT = process.argv[2];

const client = new net.Socket();
const buffer = Buffer.alloc(4);
const num = process.argv[3];

client.connect(PORT, HOST, () => {
  console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);

  const interval = setInterval(() => {
    buffer.writeInt32LE(num, 0);
    client.write(buffer);
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    client.end();
  }, 20000);
});

client.on('data', (data) => {
  console.log(`data: ${data.readInt32LE()}`);
});

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

client.on('close', () => {
  console.log('Close');
});
