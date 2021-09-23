const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }

    save(producto){
        fs.promises.appendFile(this.file, JSON.stringify(producto))
        .then((contenido) => {
            console.log(contenido);
        })
        .catch((err) => {
            console.log(err);    
        })
    }
    /* async function getById(id) {
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
    } */
}

module.exports = Contenedor;