const http = require('http');
const query = require('querystring');
const parms = query.stringify({x: 10, y:20, s:'stmnl'});
const options = {
    host: 'localhost',
    path: `/x_y_s_query`,
    port: 5000,
    method: 'POST',
}
const req = http.request(options, (res) =>{
    let res_data = '';
    res.on('data', (data) =>{
        res_data += data;
    })
    res.on('end', () => {
        console.log(res_data);
    })
});
req.write(parms);
req.end();
