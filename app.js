require('colors');
const { inquirerMenu, inquirerPausa, leerInput, listadoTareasBorrar, confirmarBorrar, completarTareas } = require('./helpers/inquirer');
const { guardarData, leerData } = require('./helpers/saveData');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const Tasks = require('./models/tasks');


const main = async() => {
    console.clear();

    let opt = '';

    const tareas = new Tasks();

    // Leemos la informacion de nuestra
    // base de datos, un archivo en esta caso
    const tareasDB = leerData();

    // Validamos que haya informacion 
    // y la cargamos
    if (tareasDB) {
        //Establecer tareas
        // TODO:
        tareas.cargarTareaDesdeArreglo(tareasDB);

    }

    do {
        // Aqui agregamos el Await para que no
        // continue hasta que la promesa sea
        // resuelta
        //opt = await mostrarMenu();
        //console.log({ opt });
        // De igual manera ponemos un await
        // a la funcion pausa para que siga
        // cuando la promesa se resuelva

        //if (opt !== '0') await pausa();

        // Ahora usaremos el paquete Inquirer
        // para imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput("Descripcion: ");
                tareas.crearTarea(desc);
                console.log(desc);
                break;

            case '2':
                tareas.listarTareas(tareas.listadoArr);
                //console.log(tareas.listadoArr);
                break;

            case '3':
                tareas.listarTareasPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarTareasPendientesCompletadas(false);
                break;
            case '5':
                const ids = await completarTareas(tareas.listadoArr);
                //console.log(ids);
                tareas.completarTareas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    if (await confirmarBorrar()) {
                        tareas.borrarTarea(id);
                        console.log(`   Tareas Borrada!!`);
                    }
                }
                break;
        }

        guardarData(tareas.listadoArr);

        console.log('\n');
        if (opt !== '0') await inquirerPausa();

    } while (opt !== '0');


    //pausa();
};

main();