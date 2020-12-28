const udp = require('dgram');

const PORT = 2000;

const server = udp.createSocket('udp4');

server.on('message', (msg, info) => {
  let msgBuffer = msg.toString();

  console.log(`Message ${info.address}:${info.port} = ${msgBuffer}`);
  msgBuffer = `ECHO: ${msgBuffer}`;

  server.send(msgBuffer, info.port, info.address, (err) => {
    if (err) server.close();
    else console.log('success');
  });
});

server.on('listening', () => {
  console.log(`Server PORT: ${server.address().port}`);
  console.log(`Server Address: ${server.address().address}`);
  console.log(`Server IPv: ${server.address().family}`);
});

server.on('error', (e) => {
  console.log(`Error: ${e}`);
});

server.on('close', () => {
  console.log('Socket close');
});

server.bind(PORT);
