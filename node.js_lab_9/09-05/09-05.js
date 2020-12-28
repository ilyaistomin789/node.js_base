const http = require('http');
const options = {
    host: 'localhost',
    path: '/xml',
    port: 5000,
    method: 'POST'
}
const xml_req =
    '<request id="28">\n' +
    '    <x value="1"/>\n' +
    '    <x value="2"/>\n' +
    '    <m value="a"/>\n' +
    '    <m value="b"/>\n' +
    '    <m value="c"/>\n' +
    '</request>\n';
const req = http.request(options, (res) => {
    let res_data = '';
    res.on('data', (data) => {
        res_data += data;
    })
    res.on('end', () => {
        console.log(res_data);
    })

})
req.on('error', err => console.log(err.message));
req.write(xml_req);
req.end();
