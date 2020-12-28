const net = require('net');

const HOST = '0.0.0.0';
const PORT = 40000;
const connections = new Map();
let timer = null;

const log = (prefix, port, socket) => `${prefix}${socket.remoteAddress}:${socket.remotePort} => `;

const server = net.createServer((socket) => {
  socket.id = (new Date()).toISOString();

  connections.set(socket.id, { comment: 'comment' });

  server.getConnections((e, c) => {
    if (!e) {
      console.log('\n');
      console.log(`${log('CONNECTED ', PORT, socket)} ${c}`);
      for (const [key, value] of connections) {
        console.log(key, value.comment);
      }
      console.log('\n');
    }
  });

  let sum = 0;

  socket.on('data', (data) => {
    // console.log(`${log('DATA: ', PORT, socket)} ${data.readInt32LE()}`);
    console.log(`${log('SUM: ', PORT, socket)} ${sum}`);

    sum += data.readInt32LE();
  });

  const buffer = Buffer.alloc(4);

  timer = setInterval(() => {
    buffer.writeInt32LE(sum, 0);
    socket.write(buffer);
  }, 5000);

  setTimeout(() => {
    connections.forEach((c) => c.close());
    clearInterval(timer);
    server.close();
  }, 25000);

  socket.on('error', (e) => {
    console.log(`${log('ERROR ', PORT, socket)} ${e}`);
  });

  socket.on('close', () => {
    connections.delete(socket.id);
    console.log(log('Closed: ', PORT, socket));
  });
});

server.listen(PORT, HOST);

server.on('error', (err) => {
  console.log(`TCP-Server Error: ${err}`);
});

console.log(`TCP server on ${HOST}:${PORT}`);
