const net = require('net');

const HOST = '0.0.0.0';
const PORT = 40000;
let sum = 0;

const server = net.createServer();

server.on('connection', (socket) => {
  console.log(`Server ${socket.remoteAddress}:${socket.remotePort} created`);

  socket.on('data', (data) => {
    console.log(`Server received: ${data.readInt32LE()}. Server sum: ${sum}`);
    sum += data.readInt32LE();
  });
  const buf = Buffer.alloc(4);
  setInterval(() => {
    buf.writeInt32LE(sum, 0);
    socket.write(buf);
  }, 5000);

  socket.on('close', () => console.log(`Server ${socket.remoteAddress}:${socket.remotePort} closed`));
}).listen(PORT, HOST);

console.log(`TCP server on ${HOST}:${PORT}`);
