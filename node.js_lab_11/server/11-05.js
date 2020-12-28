const rpcWSS = require('rpc-websockets').Server
let rpcServer = new rpcWSS({host: 'localhost', port:4000});
rpcServer.setAuth(user => user.username === 'stmnl' && user.password === 'lab11-05');
function fib(n){
    var fibonacci = [0,1];
    for (i=2; i<n; i++){
        fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
    }
    return fibonacci;
}
function fact(n){
    return (n !== 1) ? n * fact(n-1) : 1;
}
rpcServer.register('square', (params) => {
    if (typeof params[0] != "undefined" && typeof params[1] != "undefined"){
        return Number.parseInt(params[0]) * Number.parseInt(params[1]);
    }
    else if (typeof params[0] != "undefined"){
        return Math.PI * Math.pow(Number.parseInt(params[0]),2);
    }
    else{
        return "Please, enter params";
    }
}).public();
rpcServer.register('sum', (params) => {
    let sum = 0;
    params.forEach(function (item,i,params) {
        sum += Number.parseInt(item);
    })
    return sum;
}).public();
rpcServer.register('mul', (params) => {
    let mul = 1;
    params.forEach(function(item,i,params) {
        mul *= Number.parseInt(item);
    })
    return mul;
}).public();
rpcServer.register('fib', (params) => {
    if (params.length === 1){
        console.log(params);
        return fib(params);
    } else{
        return [1];
    }
}).protected();
rpcServer.register('fact', (params) => {
    if (params.length === 1){
        console.log(params);
        return fact(params);
    } else {
        return [1];
    }
}).protected();

