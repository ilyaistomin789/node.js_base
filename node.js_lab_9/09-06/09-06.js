const http = require('http');
const fs = require('fs');
const options = {
    host: 'localhost',
    path: `/txt`,
    port: 5000,
    method: 'POST',
    headers: {'Content-Type': 'text/plain'}
}
const req = http.request(options, (res) => {
    let res_data = '';
    res.on('data', (data) => {
        res_data += data;
    })
    res.on("end", () => {
        console.log(res_data);
    })
})
const stream = new fs.ReadStream('./components/files/txt.txt');
stream.on('data', (data) => {
    req.write(data);
})
stream.on('end', () => {
    req.end();
})
