const states = ['norm','stop','idle','test','exit'];
let state = states[0];
const http = require('http');
const server = http.createServer((req, res) => {
    res.end(state, ()=>{console.log('res.end()')});
}).listen(5000)
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>{
    var param = null;
    while ((param = process.stdin.read()) != null){
        switch (param.trim()) {
            case states[0]:
            case states[1]:
            case states[2]:
            case states[3]:
                process.stdout.write(state + '-->');
                state = param.trim();
                process.stdout.write(state + '\n');
                break;
            case states[4]:
                process.exit(0);
                server.close();
                break;
            default: process.stdout.write(param.trim());
        }
    }
})


console.log("http://localhost:5000");
