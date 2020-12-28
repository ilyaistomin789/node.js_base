const http = require('http');
const url = require('url');
const fs = require('fs');
const path_str = './components/files/StudentList.json';
const path = require('path');
fs.open(path_str,'w', (e, file) => {
    if (e) console.log(e.message);
    else console.log('StudentList.json was created');
})
const firstStudent = {'id': 1, 'student_name': 'Istomin Ilya', 'faculty': 'IT'};
const secondStudent = {'id': 2, 'student_name': 'Harevich Kirill', 'faculty': 'IT'};
const thirdStudent = {'id': 3, 'student_name': 'Romanitsky Valery', 'faculty': 'IT'};
fs.writeFile(path_str,`[${JSON.stringify(firstStudent)},${JSON.stringify(secondStudent)},${JSON.stringify(thirdStudent)}]`,(e) => {
    if (e) console.log(e.message);
    else console.log("Students were recorded in a file");
})

const server = http.createServer((req, res) => {
const url_path = url.parse(req.url).pathname;
    switch (req.method){
        case 'GET': {
            if (url_path === '/'){
                fs.readFile(path_str, (e,data)=>{
                    if (e) console.log(e.message);
                    else res.end(data.toString());
                })
            }
            else {
                const id_index = url_path.lastIndexOf('/');
                const id = url_path.substring(id_index + 1, url_path.length);
                if (typeof id !== "undefined"){
                    let students_json = '';
                    students_json = fs.readFileSync(path_str).toString();
                    const student_array = JSON.parse(students_json);
                    for (let e in student_array){
                        if (student_array[e].id === Number.parseInt(id))
                            res.end(`id: ${student_array[e].id} \nstudent_name: ${student_array[e].student_name} \nfaculty: ${student_array[e].faculty}`);
                    }
                }
            }
        }break;
        case 'POST': {
            if (url_path === '/'){
                let data = '';
                let exists = false;
                if (url_path === '/'){
                    let student_array = JSON.parse(fs.readFileSync(path_str).toString());
                    req.on('data', (d) => {
                        data += d;
                    })
                    req.on('end', () => {
                        for (let e in student_array){
                            if (student_array[e].id === JSON.parse(data).id) exists = true;
                        }
                        if (exists) res.end('This student already exists');
                        else{
                            student_array.push(JSON.parse(data.toString()));
                            fs.writeFileSync(path_str,`${JSON.stringify(student_array)}`);
                            const json_obj = JSON.parse(fs.readFileSync(path_str).toString());
                            let str = '';
                            for (let e in json_obj){
                                str += `Id: ${json_obj[e].id}, student_name: ${json_obj[e].student_name}, faculty: ${json_obj[e].faculty}\n`;
                            }
                            res.end(str);
                        }
                    })
                }
            }
            if (url_path === '/backup'){
                var date = new Date();
                const date_str = `${date.getFullYear()}${date.getMonth() +1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;
                setTimeout(() => {
                    fs.copyFile(path_str, `./components/files/${date_str}StudentList.json`, (e) => {
                        if (e) console.log(e.message)
                        else res.end('file was copied');
                    });
                },2000)
            }
        }break;
        case 'PUT':{
            let data = '';
            let exists = false;
            if (url_path === '/'){
                let student_array = JSON.parse(fs.readFileSync(path_str).toString());
                req.on('data', (d) => {
                    data += d;
                })
                req.on('end', () => {
                    for (let e in student_array){
                        if (student_array[e].id === JSON.parse(data).id){
                            exists = true;
                            student_array[e].student_name = JSON.parse(data).student_name;
                            student_array[e].faculty = JSON.parse(data).faculty;
                        }
                    }
                    if (exists){
                        fs.writeFileSync(path_str,`${JSON.stringify(student_array)}`);
                        const json_obj = JSON.parse(fs.readFileSync(path_str).toString());
                        let str = '';
                        for (let e in json_obj){
                            str += `Id: ${json_obj[e].id}, student_name: ${json_obj[e].student_name}, faculty: ${json_obj[e].faculty}\n`;
                        }
                        res.end(str);
                    }
                    else{
                        res.end('Student with this id does not exist');
                    }
                })
            }
        }break;
        case 'DELETE':{
            console.log(url_path.split('/')[1])
            if (url_path.split('/')[1] === 'backup'){
                const date_url_index = url_path.lastIndexOf('/');
                const date_url = url_path.substring(date_url_index + 1, url_path.length);
                const directory = 'components/files';
                fs.readdir(directory, (err, files) => {
                    if (err) res.end(err.message);
                    for (const file of files) {
                        const f = file.replace(/\D/g, '').substring(0, 8);
                        if (parseInt(f, 10) < date_url) {
                            fs.unlink(path.join(directory, file), (e) => {
                                if (e) throw e;
                                console.log(`${file} deleted`);
                                res.end(`${file} old copies deleted`);
                            });
                        }
                    }
                });
            }
            let data = '';
            let exists = false;
            const id_index = url_path.lastIndexOf('/');
            const id = url_path.substring(id_index + 1, url_path.length);
            let student_array = JSON.parse(fs.readFileSync(path_str).toString());
            const index = student_array.findIndex((s) => s.id === Number.parseInt(id));
            if (index !== -1) {
                exists = true;
                student_array.splice(index, 1);
            }
            if (exists){
                fs.writeFileSync(path_str,`${JSON.stringify(student_array)}`);
                const json_obj = JSON.parse(fs.readFileSync(path_str).toString());
                res.end(JSON.stringify(json_obj));
            }
            else{
                res.end('Student with this id does not exist');
            }
        }break;
    }
}).listen(4000)
