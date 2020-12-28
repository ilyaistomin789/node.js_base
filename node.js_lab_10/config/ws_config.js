const connection_handler = (res) =>{
    let k = 0;
    res.on('message', (message) => {
        console.log(`Message from client: ${message}`);
        const n = Number.parseInt(message.split(':')[1]);
        res.send(`10-01-server: ${n}->${++k}`);
    })
};
module.exports = {connection_handler};
