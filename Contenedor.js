const fs = require('fs');

class Contenedor{
    constructor(nombre_archivo){
        this.nombre_archivo = nombre_archivo;
    }

    const save = (objeto) => {
        fs.promises.appendFile('./productos.json', objeto)
        .then((contenido) => {
            console.log(contenido);
        })
        .catch((err) => {
            console.log(err);    
        })
    }
    async function getById(id) {
        try {
            await fs.promises.readFile('./productos.json', 'utf-8');
            console.log("guardado!");
        }
        catch (err) {
            console.log(err);
        }
    }
    async function getAll() {
        try {
            const data = await fs.promises.readFile('./productos.json', 'utf-8');
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    async function deleteById(id) {
        try {
            const data = await fs.promises.readFile('./productos.json', 'utf-8');
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = Contenedor;