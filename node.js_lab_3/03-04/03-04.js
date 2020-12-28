const http = require('http');
const fs = require('fs');
const url = require('url');
const fact = (n) => {return (n !== 1) ? n * fact(n - 1) : 1};
function testNextTick(count,callback) {
    this.fcount = count;
    this.fresult = fact;
    this.fcallback = callback;
    this.calc = ()=>{process.nextTick(() => {this.fcallback(null, this.fresult(this.fcount))})}

}
const server = http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/fact'){
        if (url.parse(req.url,true).query['k'] !== 'undefined'){
            let k = parseInt(url.parse(req.url,true).query['k']);
            if (Number.isInteger(k)){
                res.setHeader('Content-Type', 'application/json');
                let test = new testNextTick(k, (err,result) => {res.end(JSON.stringify({k:k,fact:result}));});
                test.calc();
            }
        }
    }
    if (url.parse(req.url).pathname === '/'){
        const factFile = fs.readFileSync('03-02/factHTML.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(factFile);
    }
}).listen(5000)
console.log('http://localhost:5000/');