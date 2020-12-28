const net = require('net');

const HOST = '0.0.0.0';
const PORT_1 = 40000;
const PORT_2 = 50000;

console.log('Listening...');

const startServer = (socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  let sum = 0;

  socket.on('data', (data) => {
    // console.log(`data (PORT: ${socket.remotePort}): ${data.readInt32LE()}`);
    console.log(`(server:${socket.localPort}, client:${socket.remotePort}) SUM: ${sum}`);

    sum += data.readInt32LE();
  });

  const buffer = Buffer.alloc(4);

  const interval = setInterval(() => {
    buffer.writeInt32LE(sum, 0);
    socket.write(buffer);
  }, 5000);

  setTimeout(() => {
    clearInterval(interval);
    server.close();
  }, 25000);

  socket.on('error', (e) => {
    console.log(`Error: ${e}`);
  });

  socket.on('close', () => {
    console.log('Socket close');
  });
};

net.createServer((Server) => startServer(Server)).listen(PORT_1, HOST);
net.createServer((Server) => startServer(Server)).listen(PORT_2, HOST);
