const async = require('async');
const Wsc = require('rpc-websockets').Client;

const ws = new Wsc('ws://localhost:4000');
const user = { username: 'stmnl', password: 'lab11-05' };

const err = (e, cb) => cb(JSON.stringify(e, null, 4), null);

const asyncParallel = () => async.parallel({
        square: (cb) => ws.call('square', [3]).catch((e) => err(e, cb)).then((r) => cb(null, r)),
        sum: (cb) => ws.call('sum', [2, 4, 6, 8, 10]).catch((e) => err(e, cb)).then((r) => cb(null, r)),
        mul: (cb) => ws.call('mul', [3, 5, 7, 9, 11, 13]).catch((e) => err(e, cb)).then((r) => cb(null, r)),

        fib: (cb) => ws.login(user).then(() => {
            ws.call('fib', 4).catch((e) => err(e, cb)).then((r) => cb(null, r));
        }).catch((e) => cb(e, null)),
        fact: (cb) => ws.login(user).then(() => {
            ws.call('fact', 10).catch((e) => err(e, cb)).then((r) => cb(null, r));
        }).catch((e) => cb(e, null)),
    },
    (e, r) => {
        if (e) console.log(`error = ${e}`);
        else console.log(`result = ${JSON.stringify(r, null, 4)}`);
        ws.close();
    });

ws.on('open', asyncParallel);
ws.onerror = (e) => alert(`WS error: ${e.message}`);
