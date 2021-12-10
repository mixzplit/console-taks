const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {
    /**
     * Vamos a devolver una promesa
     */

    return new Promise(resolve => {
        console.clear();
        console.log('======================='.cyan);
        console.log(' Seleccione una Opción '.cyan);
        console.log('=======================\n'.cyan);

        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Lista Tareas Completadas`);
        console.log(`${'4.'.green} Listar tareas Pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tareas`);
        console.log(`${'0.'.green} Salir`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Aqui mandamos la opcion que selecciona el usuario
        // al resolve y asi devolver la promesa
        readLine.question('Seleccione una opcion: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });

};

const pausa = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(`\nPresion ${'ENTER'.cyan} para continuar\n`, (opt) => {
            readLine.close();
            // Aqui resolvemos la promesa sin enviarle parametro
            // ya que no nos interesa la opcion, solo que que presione ENTER
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}