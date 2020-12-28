const async = require('async');
const Wsc = require('rpc-websockets').Client;

const ws = new Wsc('ws://localhost:4000');
const user = { username: 'stmnl', password: 'lab11-05' };
let sum;
//sum(square(3), square(5,4), mul(3,5,7,9,11,13))
// +fib(7)
// *mul(2,4,6)
const err = (e, cb) => cb(JSON.stringify(e, null, 4), null);

const asyncParallel = () => async.waterfall([
        (cb) => ws.call('square', [3]).catch((e) => err(e, cb)).then((s1) => cb(null, s1)),
        (s1, cb) => ws.call('square', [5, 4]).catch((e) => err(e, cb)).then((s2) => cb(null, s1, s2)),
        (s1, s2, cb) => ws.call('mul', [3, 5, 7, 9, 11, 13]).catch((e) => err(e, cb)).then((mul) => cb(null, s1, s2, mul)),
        (s1, s2, mul, cb) => ws.call('sum', [s1, s2, mul]).catch((e) => err(e, cb)).then((s) => {
            sum = s;
            cb(null);
        }),
        (cb) => ws.login(user).catch((e) => cb(e, null)).then(() => {
            ws.call('fib', [7]).catch((e) => err(e, cb)).then((f) => cb(null, f[6]));
        }),
        (f, cb) => ws.login(user).catch((e) => cb(e, null)).then(() => {
            ws.call('mul', [2, 4, 6]).catch((e) => err(e, cb)).then((m) => cb(null, f, m));
        }),
        (f, m, cb) => ws.login(user).catch((e) => cb(e, null)).then(() => {
            ws.call('mul', [f, m]).catch((e) => err(e, cb)).then((mul) => cb(null, mul));
        }),
        (mul, cb) => ws.login(user).catch((e) => cb(e, null)).then(() => {
            ws.call('sum', [sum, mul]).catch((e) => err(e, cb)).then((res) => cb(null, res));
        }),
    ],
    (e, r) => {
        if (e) console.log(`error = ${e}`);
        else console.log(`result = ${r}`);
        ws.close();
    });

ws.on('open', asyncParallel);
ws.onerror = (e) => alert(`WS error: ${e.message}`);
