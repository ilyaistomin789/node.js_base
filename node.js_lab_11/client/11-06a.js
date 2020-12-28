const Wsc = require('rpc-websockets').Client;

const ws = new Wsc('ws://localhost:4000');
const e = process.argv[2]; // A or B or C
let n = 0;
let txt;

process.stdin.resume();
process.stdin.setEncoding('utf8');

ws.on('open', () => {
    ws.on(e, (p) => console.log(`${e}: ${JSON.stringify(p)}`));
    process.stdin.on('data', (text) => {
        txt = text.trim();
        if (txt === e) {
            ws.subscribe(e);
            setInterval(() => ws.notify(`${e}_Notify`, { client: e, n: n++ }), 2000);
        }
    });
});
