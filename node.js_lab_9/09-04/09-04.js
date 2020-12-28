const http = require('http');
const json_req =
    {
        "__comment": "Request. Lab 8/10",
        "x": 1,
        "y": 4,
        "s": "my message",
        "m": ["a","b","c","d"],
        "o": {"surname": "Istomin", "name": "Ilya"}
    };
const options = {
    host: 'localhost',
    path: `/json`,
    port: 5000,
    method: 'POST'
}
const req = http.request(options, (res) => {
    let res_data = '';
    res.on('data', (data) => {
        res_data += data;
    })
    res.on('end', () => {
        console.log(res_data);
    })
})
req.write(JSON.stringify(json_req));
req.end();
