const udp = require('dgram');

const PORT = 2000;
const HOST = 'localhost';

const client = udp.createSocket('udp4');

client.on('message', (msg, info) => {
  const msgBuffer = msg.toString();
  console.log(`Message ${info.address}: ${info.port} = ${msgBuffer}`);
});

client.on('error', (e) => {
  console.log(`Error: ${e}`);
  client.close();
});

client.send('Hello from client', PORT, HOST, (e) => {
  if (e) client.close();
  else console.log('success');
});
