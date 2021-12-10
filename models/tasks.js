require('colors');
const Task = require("./task");

class Tasks {
    listado = {}

    // getter
    // Esto es para retornar un arreglo de tareas
    get listadoArr() {
        const listado = [];
        // Aqui obtenemos todas las keys de nuestro objeto
        // por eso en principio las tareas las creamos como
        // un objeto 'listado'
        Object.keys(this.listado).forEach(key => {
            // obtenemos la tareas por ID - key
            const tarea = this.listado[key];
            listado.push(tarea);
        })

        return listado
    }

    constructor() {
        this.listado = {};
    }

    // Crear Tarea
    crearTarea(desc = '') {
        const tarea = new Task(desc);
        this.listado[tarea.id] = tarea;
    }

    // Borrar Tarea
    borrarTarea(id) {
        if (this.listado[id]) {
            delete this.listado[id];
        }
    }

    // Actualizar tareas (Completada o Pendiente)
    completarTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this.listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        // Para marcar la tarea como NO completada
        this.listadoArr.forEach(tarea => {
            console.log(tarea.id);
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null;
            }
        });


    }

    // Cargar Tareas desde Arreglo
    cargarTareaDesdeArreglo(tareas) {
            // Recorro el arreglo que llega
            // por parametro y le asigno valor de id
            // al objeto listado
            tareas.forEach(tarea => {
                this.listado[tarea.id] = tarea;
            });
        }
        // Listar todas las tareas
    listarTareas(tareas) {
            let statusTarea = '';
            tareas.forEach((tarea, i) => {
                const id = `${i + 1}`.green;
                const { desc, completadoEn } = tarea;
                statusTarea = completadoEn !== null ? 'Completada'.green : 'Pendiente'.red;

                console.log(` ${id}.- ${desc} :: ${statusTarea} `);

            });
        }
        // listar tareas Pendietes o Completadas
    listarTareasPendientesCompletadas = (completadas = true) => {
        let cont = 0;
        let statusTarea = '';
        this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            statusTarea = completadoEn !== null ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    cont += 1;
                    console.log(` ${cont.toString().green}.- ${desc.green} :: ${statusTarea} `);
                }
            } else {
                if (!completadoEn) {
                    cont += 1;
                    console.log(` ${cont.toString().green}.- ${desc.red} :: ${statusTarea} `);
                }
            }
        });
    }

}

module.exports = Tasks;