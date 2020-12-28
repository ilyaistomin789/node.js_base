const http = require('http');
const fs = require('fs');
const options = {
    host: 'localhost',
    path: `/png`,
    port: 5000,
    method: 'POST'
}
const req = http.request(options,(res) => {
    let res_data = '';
    res.on('data', (data) => res_data += data);
    res.on('end', () => {
        console.log(res_data);
    })
});
const stream = new fs.ReadStream('./09-07/png/myFile.png');
let file_data = '';
stream.on('data', (data) => {
    file_data += data;
    req.write(data);

});
stream.on('end', () => {
    console.log(file_data);
    req.end();
});
req.on("error", (e) => console.log(e.message));
