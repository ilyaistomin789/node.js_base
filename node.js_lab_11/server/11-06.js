const Wss = require('rpc-websockets').Server;

const server = new Wss({ port: 4000, host: 'localhost' });
let k = 0;

server.event('A');
server.event('B');
server.event('C');

setInterval(() => server.emit('A', { forA: k++, A: 'Hello A-Client' }), 2000);
setInterval(() => server.emit('B', { forB: k++, B: 'Hello B-Client' }), 2000);
setInterval(() => server.emit('C', { forC: k++, C: 'Hello C-Client' }), 2000);

server.register('A_Notify', (o) => console.log('A client object: ', o)).public();
server.register('B_Notify', (o) => console.log('B client object: ', o)).public();
server.register('C_Notify', (o) => console.log('C client object: ', o)).public();
