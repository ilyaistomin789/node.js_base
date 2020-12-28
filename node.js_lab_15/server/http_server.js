const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url = require('url');
const connectionString = `mongodb+srv://admin_istomin:71182528@cluster0.qiqkq.mongodb.net/belstu?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

client.connect(error => {
    let db = client.db('belstu');
    if (error) console.log(error.message);
    else {
        http.createServer((req,res) => {
            const url_path = url.parse(req.url).pathname;
            switch (req.method){
                case 'GET': {
                    switch (url_path) {
                        case '/api/faculties': {
                            let row = '';
                            db.collection('faculty').find({}).toArray((e, documents) => {
                                if (e) res.end(JSON.stringify({error: e.message}))
                                else documents.forEach(el => row += `${JSON.stringify({faculty: el.faculty,faculty_name:el.faculty_name})}\n`);
                                res.end(row);
                            })

                        }break;
                        case '/api/pulpits': {
                            let row = '';
                            db.collection('pulpit').find({}).toArray((e, documents) => {
                                if (e) res.end(JSON.stringify({error: e.message}))
                                else documents.forEach(el => row += `${JSON.stringify({pulpit:el.pulpit, pulpit_name: el.pulpit_name, faculty: el.faculty})}\n`);
                                res.end(row);
                            })
                        }break;
                        default: res.end('Invalid request');
                        break;
                    }

                }break;
                case 'POST':{

                    switch (url_path) {
                        case '/api/faculties': {
                            let data = '';
                            req.on('data', d => {
                                data += d;
                            })
                            req.on('end', () => {
                                const data_json = JSON.parse(data);
                                db.collection('faculty').insertOne({faculty:data_json['faculty'], faculty_name: data_json['faculty_name']}, (err,r) => {
                                    if (err) res.end(JSON.stringify({error: err.message}));
                                    else res.end(data);
                            })
                            });
                        }break;
                        case '/api/pulpits': {
                            let data = '';
                            req.on('data', d => {
                                data += d;
                            })
                            req.on('end', () => {
                                const data_json = JSON.parse(data);
                                db.collection('pulpit').insertOne({pulpit:data_json['pulpit'], pulpit_name: data_json['pulpit_name'], faculty: data_json['faculty']}, (err,r) => {
                                    if (err) res.end(JSON.stringify({error: err.message}));
                                    else res.end(data);
                                });
                            })
                        }break;
                        default: res.end('Invalid request');
                        break;
                    }
                }break;
                case 'PUT':{
                    switch (url_path){
                        case '/api/faculties':{
                            let data = '';
                            req.on('data', d => {
                                data += d;
                            })
                            req.on('end', () => {
                                const data_json = JSON.parse(data);
                                db.collection('faculty').findOneAndUpdate({faculty:data_json['faculty']},{$set:{ faculty_name: data_json['faculty_name']}}, (err,r) => {
                                    if (err) res.end(JSON.stringify({error: err.message}));
                                    else res.end(data);
                                });
                            })
                        }break;
                        case '/api/pulpits':{
                            let data = '';
                            req.on('data', d => {
                                data += d;
                            })
                            req.on('end', () => {
                                const data_json = JSON.parse(data);
                                db.collection('pulpit').findOneAndUpdate({pulpit:data_json['pulpit']},{$set:{ pulpit_name: data_json['pulpit_name'], faculty: data_json['faculty']}}, (err,r) => {
                                    if (err) res.end(JSON.stringify({error: err.message}));
                                    else res.end(data);
                                });
                            })
                        }break;
                        default: res.end('Invalid request');
                            break;
                    }
                }break;
                case 'DELETE':{
                    const decode_uri = decodeURI(url_path);
                    let sub_url = decode_uri.replace(decode_uri.split('/')[3], '');
                    sub_url = sub_url.slice(0,-1);
                    switch (sub_url) {
                        case '/api/faculties':{
                            const param = decode_uri.split('/')[3];
                            let element = '';
                            db.collection('faculty').findOne({faculty: param},(error1, documents) => {
                                if (error1) res.end(JSON.stringify({error: error1.message}))
                                else {
                                    element = JSON.stringify({faculty: documents.faculty, faculty_name: documents.faculty_name});
                                }
                            })
                            db.collection('faculty').deleteOne({faculty: param}, (err,r) => {
                                if (err) res.end(JSON.stringify({error: err.message}))
                                else res.end(element);
                            })
                        }break;
                        case '/api/pulpits':{
                            const param = decode_uri.split('/')[3];
                            let element = '';
                            db.collection('pulpit').findOne({pulpit: param}, (error1, documents) => {
                                if (error1) res.end(JSON.stringify({error: error1.message}))
                                else {
                                    element = JSON.stringify({pulpit: documents.pulpit, pulpit_name: documents.pulpit_name, faculty: documents.faculty});
                                }
                            })
                            db.collection('pulpit').deleteOne({pulpit: param}, (err,r) => {
                                if (err) res.end(JSON.stringify({error: err.message}))
                                else res.end(element);
                            })
                        }break;
                        default: res.end('Invalid request');
                            break;
                    }
                }break;
            }
        }).listen(3000)
    }
})
