const http = require('http');
let data = '';
const options = {
    host: 'localhost',
    path: '/get_params',
    port: 5000,
    method: 'GET'
}
const req = http.request(options, (res) =>{
    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
    console.log(`IP-Address: ${res.socket.localAddress}`)
    console.log(`Port: ${res.socket.localPort}`);
    res.on('data', (chunk) =>{
        data += chunk.toString('utf-8');
    })
    res.on('end', () => {
        console.log(`Data: ${data}`);
    })
})
req.on("error", (err) => {
    console.log(err.message);
})
req.end();
