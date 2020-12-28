const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const config = (req, res) => {
    if (req.method === 'GET'){
        switch (url.parse(req.url).pathname){
            case '/get_params':{
                res.end('MY DATA');
            }break;
            case '/x_y_query':{
                const x = url.parse(req.url, true).query.x;
                const y = url.parse(req.url, true).query.y;
                if (typeof x != "undefined" && typeof y != "undefined"){
                    res.end(`Status: ${res.statusCode}\nx: ${x} \ny: ${y}`);
                }else{
                    res.end('Please, enter the params (x,y)');
                }
            }break;
            case '/png': {
                const stream = new fs.ReadStream('./09-08/png/down.png');
                stream.on('data', (data) => {
                    res.write(data);
                })
                stream.on('end', () => res.end());

            }break;
        }
    }
    if (req.method === 'POST'){
        switch (url.parse(req.url).pathname){
            case '/x_y_s_query':{
                let req_data = '';
                let req_data_params = '';
                req.on('data', (data) => {
                    req_data += data;
                })
                req.on('end', () => {
                    let response = '';
                    req_data_params = qs.parse(req_data);
                    for (let obj in req_data_params) response += `${obj}: ${req_data_params[obj]}\n`;
                    res.end(`Status: ${res.statusCode}\n${response}`);
                })
            }break;
            case '/json':{
                let req_data = '';
                req.on('data', (data) => {
                    req_data += data;
                })
                req.on('end', () => {
                    let response = '';
                    let json_req = JSON.parse(req_data);
                    for (let obj in json_req) {
                        if (typeof json_req[obj] != "object"){
                            response += `${obj}: ${json_req[obj]}\n`;
                        }
                        else{
                            for (let o in json_req[obj]){
                                response += `${o}: ${json_req[obj][o]}\n`;
                            }
                        }
                    };
                    res.end(response);
                })
            }break;
            case '/xml': {
                let req_data = '';
                let response = '';
                req.on('data', (data) => {
                    req_data += data;
                })
                req.on('end', () => {
                    parseString(req_data, (err, result) => {
                        if (err){
                            response += err.message;
                        }
                        else{
                            response += 'X elements\n';
                            result.request.x.map(e => {
                                response += `x: ${e.$.value}\n`;
                            })
                            response += 'M elements\n';
                            result.request.m.map(e => {
                                response += `m: ${e.$.value}\n`;
                            })
                        }
                    })
                    res.end(response);
                })

            }break;
            case '/txt': {
                let req_data = '';
                const file = fs.createWriteStream('./components/files/txtFromServer.txt');
                req.pipe(file);
                res.end();

            }break;
            case '/png': {
                let req_data = '';
                const file = fs.createWriteStream('./09-07/png/fromServer.png');
                req.on('data', (data) => {
                    req_data += data;
                })
                req.pipe(file);
                res.end();
            }break;
        }
    }
}
module.exports = {config};
