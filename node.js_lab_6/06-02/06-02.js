const sendmail = require('sendmail')({silent: true});
const fs = require('fs');
const http = require('http');

function send(fromMail, toMail, mailMessage){
    sendmail({
        from: fromMail,
        to: toMail,
        html: '<div>' +  mailMessage + '</div>'
    }, function (err,reply) {
        console.log(err && err.stack);
        console.dir(reply);
    })
    console.log('Data was sent\n' + 'From: ' + fromMail + '\n' + 'To: ' + toMail + '\n' + 'Text: ' + mailMessage);
}
const server = http.createServer(((req, res) => {
    if (req.url === '/'){
        const index = fs.readFileSync('06-02/index.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
        if (req.method === 'POST'){
            req.on('data',(d) => {
                const data = JSON.parse(d);
                console.log(data);
                send(data.fromMail, data.toMail, data.mailMessage);

            })
        }
    }
})).listen(5000)