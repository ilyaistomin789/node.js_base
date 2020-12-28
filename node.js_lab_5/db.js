const util = require('util');
const ee = require('events');
exports.commit = 0;
let db_data = [
    {
        id: 1, name: 'Istomin I.O.', bday: '05.03.2001'
    },
    {
        id: 2, name: 'Shmirev D.V.', bday: '21.10.2000',
    },
    {
        id: 3, name: 'Kharevich K.V.', bday: '29.06.2001'
    }
]
function DB() {
    this.get = () => {return db_data;}
    this.post = (data) => {
        db_data.push(data);
    }
    this.put = (data) => {
        db_data.forEach((el) =>{
            if (el.id === Number.parseInt(data.id)){
                el.name = data.name;
                el.bday = data.bday;
            }
        })
    }
    this.delete = (id) => {
        const temp = db_data.filter((item) => {
            return item.id != id;
        })
        db_data = temp;
    }
    this.commit = () => {
        console.log('commit');
        exports.commit++;
    }
}
util.inherits(DB, ee.EventEmitter);

exports.DB = DB;
