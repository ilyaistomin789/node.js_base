const fs = require('fs');
const http = require('http');
const iio_nodemail = require('iio-nodemail');
const server = http.createServer(((req, res) => {
    if (req.url === '/'){
        const index = fs.readFileSync('06-03/index.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
        if (req.method === 'POST'){
            req.on('data',(d) => {
                const data = JSON.parse(d);
                console.log(data);
                iio_nodemail.send(data.mailMessage);
            })
        }
    }
})).listen(5000)