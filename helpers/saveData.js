const fs = require('fs');
const fileName = './db/data.json';

// Guardar
const guardarData = (datos) => {
    // creamos y escribimos el archivo y lo parseamos a STRING
    fs.writeFileSync(fileName, JSON.stringify(datos));
}

// Leer
const leerData = () => {
    if (!fs.existsSync(fileName)) {
        return null;
    }
    //obtenemos la informacion del archivo
    const info = fs.readFileSync(fileName, { encoding: 'utf-8' });
    // Ahora devolvemos la info a un OBJETO
    const data = JSON.parse(info);
    //console.log(data);
    return data;
}

module.exports = {
    guardarData,
    leerData
}