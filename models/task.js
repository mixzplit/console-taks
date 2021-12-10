const { v4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completadoEn = null;
    creadoEn = new Date().toISOString(); // Timestamp

    constructor(desc) {
        this.id = v4();
        this.desc = desc;
        this.completadoEn = this.completadoEn;
        this.creadoEn = this.creadoEn;
    }
}

module.exports = Task;