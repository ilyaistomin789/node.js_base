const http = require('http');
const sql = require("mssql/msnodesqlv8");
const url = require('url');
const fs = require('fs');

const conn = new sql.ConnectionPool({
    database: "nodejs_lab_4",
    server: "DESKTOP-FJRO5QD",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
    pool: {max: 10, min: 0}
});

const server = http.createServer(((req, res) => {
    const url_path = url.parse(req.url).pathname;
    // const pathname = url_path.split('/')[1];
    switch (req.method){
        case 'GET': {
            switch (url_path) {
                case '/':{
                    res.end(fs.readFileSync('./src/components/main.html'));
                }break;
                case '/api/faculties':{
                    let employee_array = [];
                    conn.connect().then((pool) => {
                        console.log('Connected');

                        const request = pool.request();
                        request.query('use nodejs_lab_4; select * from faculty');
                        request.stream = true;

                        request.on('row', row => {
                            employee_array.push(`${JSON.stringify(row)}`);
                        }).on('error', (e) => {
                            res.end(JSON.stringify({error:e.message}));
                        }).on('done', result => {res.end(JSON.stringify(employee_array))})
                    });
                }break;
                case '/api/pulpits':{
                    let employee_array = [];
                    conn.connect().then((pool) => {
                        console.log('Connected');

                        const request = pool.request();
                        request.query('use nodejs_lab_4; select * from pulpit');
                        request.stream = true;
                        request.on('row', row => {
                            employee_array.push(`${JSON.stringify(row)}`);
                        }).on('error', (e) => {
                            res.setHeader('Content-type', 'application/json; charset=utf-8');
                            res.end(JSON.stringify({error:e.message}));
                        }).on('done', result => {res.end(JSON.stringify(employee_array))})
                    });
                }break;
                case '/api/subjects':{
                    let employee_array = [];
                    conn.connect().then((pool) => {
                        console.log('Connected');

                        const request = pool.request();
                        request.query('use nodejs_lab_4; select * from subject');
                        request.stream = true;
                        request.on('row', row => {
                            employee_array.push(`${JSON.stringify(row)}`);
                        }).on('error', (e) => {
                            res.end(JSON.stringify({error:e.message}));
                        }).on('done', result => {res.end(JSON.stringify(employee_array))})
                    });

                }break;
                case '/api/auditoriumstypes':{
                    let employee_array = [];
                    conn.connect().then((pool) => {
                        console.log('Connected');

                        const request = pool.request();
                        request.query('use nodejs_lab_4; select * from auditorium_type');
                        request.stream = true;
                        request.on('row', row => {
                            employee_array.push(`${JSON.stringify(row)}`);
                        }).on('error', (e) => {
                            res.end(JSON.stringify({error:e.message}));
                        }).on('done', result => {res.end(JSON.stringify(employee_array))})
                    });
                }break;
                case '/api/auditorims':{
                    let employee_array = [];
                    conn.connect().then((pool) => {
                        console.log('Connected');

                        const request = pool.request();
                        request.query('use nodejs_lab_4; select * from auditorium');
                        request.stream = true;
                        request.on('row', row => {
                            employee_array.push(`${JSON.stringify(row)}`);
                        }).on('error', (e) => {
                            res.end(JSON.stringify({error:e.message}));
                        }).on('done', result => {res.end(JSON.stringify(employee_array))})
                    });

                }break;
                default: res.end(JSON.stringify({error: 'Invalid request'}))
                    break;
            }

        }break;
        case 'POST':{
            switch (url_path){
                case '/api/faculties': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('fac', sql.NVarChar(10), json_data['faculty'])
                            request.input('fac_name', sql.NVarChar(100), json_data['faculty_name'])
                            request.query('set language english;insert faculty(faculty,faculty_name) values(@fac,@fac_name)', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/pulpits': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('pul', sql.NVarChar(10), json_data['pulpit'])
                            request.input('pul_name', sql.NVarChar(100), json_data['pulpit_name'])
                            request.input('fac', sql.NVarChar(10), json_data['faculty'])
                            request.query('set language english;insert pulpit(pulpit,pulpit_name,faculty) values(@pul,@pul_name,@fac)', (err,result) => {
                                if (err) {
                                    res.setHeader('Content-type', 'application/json; charset=utf-8');
                                    res.end(JSON.stringify({error: err.message.toString()}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/subjects': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('subj', sql.NVarChar(10), json_data['subject'])
                            request.input('subj_name', sql.NVarChar(100), json_data['subject_name'])
                            request.input('pulp', sql.NVarChar(10), json_data['pulpit'])
                            request.query('set language english;insert subject values(@subj,@subj_name,@pulp)', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/auditoriumstypes': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('audit_type', sql.NVarChar(10), json_data['auditorium_type'])
                            request.input('audit_typename', sql.VarChar(30), json_data['auditorium_typename'])
                            request.query('set language english;insert auditorium_type values (@audit_type,@audit_typename)', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/auditoriums': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('audit', sql.NVarChar(20), json_data['auditorium'])
                            request.input('audit_type', sql.NVarChar(10), json_data['auditorium_type'])
                            request.input('audit_capacity', sql.Int, json_data['auditorium_capacity'])
                            request.input('audit_name', sql.VarChar(50), json_data['auditorium_name'])
                            request.query('set language english;insert auditorium values (@audit,@audit_type,@audit_capacity,@audit_name)', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                default: res.end(JSON.stringify({error: 'Invalid request'}))
                    break;
            }
        }break;
        case 'PUT':{
            switch (url_path) {
                case '/api/faculties': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('fac', sql.NVarChar(10), json_data['faculty'])
                            request.input('fac_name', sql.NVarChar(100), json_data['faculty_name'])
                            request.query('set language english;update faculty set faculty_name = @fac_name where faculty = @fac', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/pulpits': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('pul', sql.NVarChar(10), json_data['pulpit'])
                            request.input('pul_name', sql.NVarChar(100), json_data['pulpit_name'])
                            request.input('fac', sql.NVarChar(10), json_data['faculty'])
                            request.query('set language english;update pulpit set pulpit_name = @pul_name, faculty = @fac where pulpit = @pul', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/subjects': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('subj', sql.NVarChar(10), json_data['subject'])
                            request.input('subj_name', sql.NVarChar(100), json_data['subject_name'])
                            request.input('pulp', sql.NVarChar(10), json_data['pulpit'])
                            request.query('set language english;update subject set subject_name = @subj_name, pulpit = @pulp where subject = @subj', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/auditoriumstypes': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('audit_type', sql.NVarChar(10), json_data['auditorium_type'])
                            request.input('audit_typename', sql.VarChar(30), json_data['auditorium_typename'])
                            request.query('set language english;update auditorium_type set auditorium_typename = @audit_typename where auditorium_type = @audit_type', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                case '/api/auditoriums': {
                    let data = '';
                    req.on('data', (d) =>{
                        data += d;
                    })
                    req.on('end', ()=> {
                        const json_data = JSON.parse(data);
                        conn.connect().then((pool) => {
                            console.log('Connected');
                            const request = pool.request();
                            request.input('audit', sql.NVarChar(20), json_data['auditorium'])
                            request.input('audit_type', sql.NVarChar(10), json_data['auditorium_type'])
                            request.input('audit_capacity', sql.Int, json_data['auditorium_capacity'])
                            request.input('audit_name', sql.VarChar(50), json_data['auditorium_name'])
                            request.query('set language english;update auditorium set auditorium_type = @audit_type, auditorium_capacity = @audit_capacity, ' +
                                'auditorium_name = @audit_name where auditorium = @audit', (err,result) => {
                                if (err) {
                                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                    res.end(JSON.stringify({error: err.message}));
                                }
                                else res.end(data);
                            });
                        });
                    })
                }break;
                default: res.end(JSON.stringify({error: 'Invalid request'}))
                    break;
            }
        }break;
        case 'DELETE':{
            const decode_uri = decodeURI(url_path);
            let sub_url = decode_uri.replace(decode_uri.split('/')[3], '');
            sub_url = sub_url.slice(0,-1);
            switch (sub_url) {
                case '/api/faculties': {
                    const param = decode_uri.split('/')[3];
                    conn.connect().then((pool) => {
                        console.log('Connected');
                        const request = pool.request();
                        request.input('fac', sql.NVarChar(10), param);
                        request.query(`set language english;delete faculty where faculty = @fac`, (err,result) => {
                            if (err) {
                                res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                res.end(JSON.stringify({error: err.message}));
                            }
                            else res.end(`Element with code ${param} was deleted`);
                        });
                    });
                }break;
                case '/api/pulpits': {
                    const param = decode_uri.split('/')[3];
                    conn.connect().then((pool) => {
                        console.log('Connected');
                        const request = pool.request();
                        request.input('pulp', sql.NVarChar(10), param);
                        request.query(`set language english;delete pulpit where pulpit = @pulp`, (err,result) => {
                            if (err) {
                                res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                res.end(JSON.stringify({error: err.message}));
                            }
                            else res.end(`Element with code ${param} was deleted`);
                        });
                    });
                }break;
                case '/api/subjects': {
                    const param = decode_uri.split('/')[3];
                    conn.connect().then((pool) => {
                        console.log('Connected');
                        const request = pool.request();
                        request.input('sub', sql.NVarChar(10), param);
                        request.query(`set language english;delete subject where subject = @sub`, (err,result) => {
                            if (err) {
                                res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                res.end(JSON.stringify({error: err.message}));
                            }
                            else res.end(`Element with code ${param} was deleted`);
                        });
                    });
                }break;
                case '/api/auditoriumstypes': {
                    const param = decode_uri.split('/')[3];
                    conn.connect().then((pool) => {
                        console.log('Connected');
                        const request = pool.request();
                        request.input('audit_type', sql.NVarChar(10), param);
                        request.query(`set language english;delete auditorium_type where auditorium_type = @audit_type`, (err,result) => {
                            if (err) {
                                res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                res.end(JSON.stringify({error: err.message}));
                            }
                            else res.end(`Element with code ${param} was deleted`);
                        });
                    });
                }break;
                case '/api/auditoriums': {
                    const param = decode_uri.split('/')[3];
                    conn.connect().then((pool) => {
                        console.log('Connected');
                        const request = pool.request();
                        request.input('audit', sql.NVarChar(10), param);
                        request.query(`set language english;delete auditorium where auditorium = @audit`, (err,result) => {
                            if (err) {
                                res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                                res.end(JSON.stringify({error: err.message}));
                            }
                            else res.end(`Element with code ${param} was deleted`);
                        });
                    });
                }break;
                default: res.end(JSON.stringify({error: 'Invalid request'}))
                    break;
            }
        }

    }

})).listen(3000);
