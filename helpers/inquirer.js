const inquirer = require('inquirer');
require('colors');

// Array de opciones que acepta Inquirer
// hay muchos mas, pero solo usaremos esto
// por el momento
const menuOpts = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        { value: '1', name: `${'1.'.green} Crear Tarea` },
        { value: '2', name: `${'2.'.green} Listar Tareas` },
        { value: '3', name: `${'3.'.green} Lista Tareas Completadas` },
        { value: '4', name: `${'4.'.green} Listar tareas Pendientes` },
        { value: '5', name: `${'5.'.green} Completar tarea(s)` },
        { value: '6', name: `${'6.'.green} Borrar tareas` },
        { value: '0', name: `${'0.'.green} Salir` },

    ]
}];

// Para continuar
const pregunta = [{
    type: 'input',
    name: 'continuar',
    message: `Presione ${'ENTER'.cyan} para continuar`
}]

const inquirerMenu = async() => {
    console.clear();
    console.log('======================='.cyan);
    console.log(' Seleccione una Opción '.cyan);
    console.log('=======================\n'.cyan);

    // Desestructuramos
    const { opcion } = await inquirer.prompt(menuOpts)

    return opcion;

}

const inquirerPausa = async() => {
    const { message } = await inquirer.prompt(pregunta);

    return message;
}

const leerInput = async(mensaje) => {
    const question = [{
        type: 'input',
        name: 'descripcion',
        message: mensaje,
        validate(value) {
            if (value.length === 0) {
                return 'Debe ingresar un valir'
            }
            return true;
        }
    }];

    const { descripcion } = await inquirer.prompt(question);
    return descripcion;

}

// Convertir tareas en opciones para luego Borrar
const listadoTareasBorrar = async(tareas) => {

    const choices = tareas.map((tarea, i) => {
        let id = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${id}. ${tarea.desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: `${'0'.green}. Cancelar`
    });

    const borrarTarea = [{
        type: 'list',
        name: 'id',
        message: '¿Que tarea desea borrar?',
        choices: choices
    }];

    const { id } = await inquirer.prompt(borrarTarea)

    return id;
}

// Confirmacion antes de Borrar
const confirmarBorrar = async() => {
    const confirm = [{
        type: 'confirm',
        name: 'confirmar',
        message: '¿Quiere borrar esta tarea?'
    }];

    const { confirmar } = await inquirer.prompt(confirm);

    return confirmar;
}

// Opcion Completar Tareas
const completarTareas = async(tareas) => {
    const choices = tareas.map((tarea, i) => {
        let id = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${id}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const seleccionarTarea = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccionar',
        choices: choices
    }];

    const { ids } = await inquirer.prompt(seleccionarTarea)

    return ids;

}


module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrar,
    completarTareas
};