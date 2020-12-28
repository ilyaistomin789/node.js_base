const sendmail = require('sendmail');
const email = 'ilyaistomin.888@yandex.ru';
function send(message){
    sendmail({
        from: email,
        to: email,
        html: '<div>' + message + '</div>'
    }, function (err,reply) {
        console.log(err && err.stack);
        console.dir(reply);
    })
}
module.exports.send = send;