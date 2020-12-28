const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;

const client = new net.Socket();
const buf = Buffer.alloc(4);
const num = process.argv[2];

client.connect(PORT, HOST, () => {
  console.log(`Client connected: ${client.remoteAddress} ${client.remotePort}`);

  const timer = setInterval(() => {
    buf.writeInt32LE(num, 0);
    client.write(buf);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    client.end();
  }, 20000);

  client.on('data', (data) => {
    console.log(`data: ${data.readInt32LE()}`);
  });

  client.on('error', (err) => {
    console.log(`Error: ${err}`);
  });

  client.on('close', () => {
    console.log('Close');
  });
});

client.on('close', () => console.log('Client closed'));
client.on('error', (e) => console.log('Client error', e));
