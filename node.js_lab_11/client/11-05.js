const rpcWSC = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000');

ws.on('open', () => {
    ws.call('square', [3]).then(response => {console.log(`square[3]: ${response}`)});
    ws.call('square', [5,4]).then(response => {console.log(`square[5,4]: ${response}`)});
    ws.call('sum', [2]).then(response => {console.log(`sum[2]: ${response}`)});
    ws.call('sum', [2,4,6,8,10]).then(response => {console.log(`sum[2,4,6,8,10]: ${response}`)});
    ws.call('mul', [3]).then(response => {console.log(`mul[3]: ${response}`)});
    ws.call('mul', [3,5,7,9,11,13]).then(response => {console.log(`mul[3,5,7,9,11,13]: ${response}`)});

    ws.login({'username': 'stmnl', 'password':'lab11-05'}).then(function() {
        ws.call('fib', [1]).catch(e => console.log(e.message)).then(response => {console.log(`fib[1]: ${response}`)});
        ws.call('fib', [2]).catch(e => console.log(e.message)).then(response => {console.log(`fib[2]: ${response}`)});
        ws.call('fib', [7]).catch(e => console.log(e.message)).then(response => {console.log(`fib[7]: ${response}`)});
        ws.call('fact', [0]).catch(e => console.log(e.message)).then(response => {console.log(`fact[0]: ${response}`)});
        ws.call('fact', [5]).catch(e => console.log(e.message)).then(response => {console.log(`fact[5]: ${response}`)});
        ws.call('fact', [10]).catch(e => console.log(e.message)).then(response => {console.log(`fact[10]: ${response}`)});
    }).catch(function(error) {
        console.log('auth failed')
    })
})
