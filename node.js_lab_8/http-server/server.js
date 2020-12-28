const http = require('http');
const PORT = 5000;
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder');
const mp = require('multiparty');
const calc = (x, y, res) => {
    if (typeof x === 'undefined' || typeof y === 'undefined'){
        res.end('Please, enter the parameters (x,y)');
    }
    if (Number.isInteger(Number.parseInt(x)) && Number.isInteger(Number.parseInt(y))){
        const sum = Number.parseInt(x) + Number.parseInt(y);
        const dif = Number.parseInt(x) - Number.parseInt(y);
        const mult = Number.parseInt(x) * Number.parseInt(y);
        const div = Number.parseInt(x) / Number.parseInt(y);
        res.write(`Sum: ${sum}\nDif: ${dif}\nMult: ${mult}\nDiv: ${div}`);
    }
}
const server = http.createServer((req, res) => {
    try {
        switch (url.parse(req.url).pathname.split('/')[1]) {
            case 'connection':{
                let con = 0;
                const set = url.parse(req.url,true).query.set;
                res.setHeader('Content-Type', 'text/plain');
                if (typeof set != 'undefined'){
                    server.keepAliveTimeout = Number.parseInt(set);
                    res.end(server.keepAliveTimeout.toString());
                }
                else{
                    res.end(Number.parseInt(server.keepAliveTimeout).toString());
                }
                server.on('connection', (socket) => {
                    console.log(`Connection #${++con}`);
                })
            }break;
            case 'headers':{
                res.setHeader('Content-Type', 'text/plain');
                res.write('--------Request Headers--------' + '\n');
                for (obj in req.headers){
                    res.write(obj + ' : ' + req.headers[obj] + '\n', 'utf-8');
                }
                res.write('-------------------------------' + '\n');
                res.write('--------Response Headers--------' + '\n');
                res.write(JSON.stringify(res.getHeaders()) + '\n');
                res.write('-------------------------------' + '\n');
                res.end();
            }break;
            case 'parameter':{
                if (typeof url.parse(req.url).pathname.split('/')[2] === "undefined" && typeof url.parse(req.url).pathname.split('/')[3] === 'undefined'){
                    const x = url.parse(req.url,true).query.x;
                    const y = url.parse(req.url,true).query.y;
                    calc(x,y,res);
                    res.end();
                }
                else{
                    const x = url.parse(req.url).pathname.split('/')[2];
                    const y = url.parse(req.url).pathname.split('/')[3];
                    calc(x,y,res);
                    res.end();
                }
            }break;
            case 'close':{
                res.write('Server will close after 10 sec');
                let timer = setTimeout(() => {
                    server.close();
                    timer = null;
                    console.log('server is closed');
                },10000)
                res.end();
            }break;
            case 'socket':{
                res.write(`Client:\nIp-address: ${req.connection.localAddress}\nPort: ${req.connection.localPort}\nServer:\nIp-address: ${res.connection.localAddress}\nPort: ${res.connection.localPort}`);4
                res.end();
            }break;
            case 'req-data':{
                let buf = '';
                req.on('data', (data) => {
                    buf += data;
                    console.log(`START\ndata: ${buf}\ndata.length: ${data.length}`);
                })
                req.on('end', () => {
                    console.log(`END\ndata: ${buf}\nbuf.length: ${buf.length}`);
                })
                res.end(buf);
            }break;
            case 'resp-status':{
                const code = url.parse(req.url,true).query.code;
                const mess = url.parse(req.url,true).query.mess;
                if (typeof code != "undefined" && typeof mess != "undefined"){
                    res.statusCode = code;
                    res.statusMessage = mess;
                    res.end(`res.statusCode: ${res.statusCode}\nres.statusMessage: ${res.statusMessage}`);
                }
                else{
                    res.end("Please, enter the params");
                }
            }break;
            case 'formparameter':{
                if (req.method === 'GET'){
                    res.end(fs.readFileSync('./components/html/formparameter.html'));
                }
                if (req.method === 'POST'){
                    let result = '';
                    req.on('data', (data) => {result += data;});
                    req.on('end', () => {
                        result += '<br/>';
                        let obj = qs.parse(result);
                        for (let o in obj) { result += `${o} = ${obj[o]}</br>`};
                        res.setHeader('Content-Type', 'text/html');
                        res.end(result);
                    })
                }
            }break;
            case 'json':{
                    if (req.method === 'POST'){
                        let result = '';
                        req.on('data', (data) => {
                            result += data;
                        })
                        req.on('end', () => {
                            const json_req = JSON.parse(result);
                            const json_res = {
                                "__comment": "Response. Lab 8/10",
                                "x_plus_y": Number.parseInt(json_req['x']) + Number.parseInt(json_req['y']),
                                "Concatination_s_o": `${json_req['s']} ${json_req['o']['surname']} ${json_req['o']['name']}`,
                                "Length_m": `${json_req['m'].length}`
                            }
                            res.end(JSON.stringify(json_res));
                            }
                        )
                    }

            }break;
            case 'xml':{
                if (req.method === 'POST'){
                    let xml_req = '';
                    req.on('data', (data) => {
                        xml_req += data;
                    });
                    req.on('end', () => {
                        let sum = 0;
                        let concat_res = '';
                        parseString(xml_req, (err, result) => {
                            result.request.x.map((e,i) =>{
                                sum += Number.parseInt(e.$.value);
                            });
                            result.request.m.map((e,i) =>{
                                concat_res += e.$.value;
                            });
                        })
                        const xml_doc = xmlbuilder.create('response').att('id','33').att('request', '28');
                        xml_doc.ele('sum').att('element', 'x').att('result', sum.toString());
                        xml_doc.ele('concat').att('element','m').att('result', concat_res);
                        res.end(xml_doc.toString());
                    })
                }
            }break;
            case 'files':{
                if (typeof url.parse(req.url).pathname.split('/')[2] === "undefined"){
                    fs.readdir('./components/requests', (err,files) =>{
                        res.setHeader('X-files-count', files.length);
                        res.end('X-files-count: ' + files.length);
                    })
                }
                else{
                    const file = url.parse(req.url).pathname.split('/')[2];
                    if (fs.existsSync('./components/requests/' + file)){
                        const open_file = fs.readFileSync('./components/requests/' + file);
                        res.end(open_file);
                    }
                    else{
                        res.statusMessage = 'file not found';
                        res.statusCode = 404;
                        res.end(`Error ${res.statusCode} : ${res.statusMessage}`);
                    }
                }
            }break;
            case 'upload':{
                if (req.method === 'GET'){
                    res.end(fs.readFileSync('./components/html/save_file.html'));
                }
                if (req.method === 'POST'){
                    let form = new mp.Form({ uploadDir: "./static" });
                    form.parse(req, (err, fields, files) => {
                        res.end('File successfully uploaded');
                    });
                }
            }break;
        }
    } catch (e) {}
}).listen(PORT)
    .on('error', e => {console.log(e.message)})
console.log('http://localhost:5000/connection')
console.log('http://localhost:5000/headers')
console.log('http://localhost:5000/parameter?x=3&&y=6')
console.log('http://localhost:5000/parameter/5/6')
console.log('http://localhost:5000/close')
console.log('http://localhost:5000/socket')
console.log('http://localhost:5000/req-data (send message with POSTMAN)')
console.log('http://localhost:5000/resp-status?code=200&&mess=Good')
console.log('http://localhost:5000/formparameter')
console.log('http://localhost:5000/json')
console.log('http://localhost:5000/xml')
console.log('http://localhost:5000/files')
console.log('http://localhost:5000/files/json.json')
console.log('http://localhost:5000/upload')
