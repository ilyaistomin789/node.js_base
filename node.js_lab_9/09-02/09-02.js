const http = require('http');
const query = require('querystring');
const parms = query.stringify({x: 10, y:20});
const options = {
    host: 'localhost',
    path: `/x_y_query?${parms}`,
    port: 5000,
    method: 'GET'
}
const req = http.request(options,(res) => {
    let res_data = '';
    res.on('data', (data) => {
        res_data += data;
    })
    res.on('end', () => {
        console.log(res_data);
    })
})
console.log(`/x_y_query?${parms}`)
req.on("error", (err) => {
    console.log(err.message);
})
req.end();
