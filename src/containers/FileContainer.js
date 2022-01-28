import { promises } from 'fs';

class FileContainer{
    constructor(file){
        this.file = file;
    }

    // CREATE
    async create(producto) {
        try {
            let productos = [];
            // Traer productos
            const contenido = await promises.readFile(this.file, 'utf-8');
            // Si no hay productos, el id será 1
            if (contenido == '[]') {
                producto.id = 1;
                productos.push(producto);
            // Si hay productos, el id será igual al id del último + 1
            } else {
                const listaProductos = JSON.parse(contenido);
                const ultimoID = listaProductos.length-1;
                producto.id = listaProductos[ultimoID].id + 1;
                listaProductos.push(producto);
                productos = listaProductos;
            }
            const productosString = JSON.stringify(productos, null, 2);
            await promises.writeFile(this.file, productosString);
            // Retorna el id guardado
            return producto.id;   
        } catch ( error ) {
            console.log('error: ', error);
        }
    }

    // READ
    async readId(id) {
        try {
            const contenido = await promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna null
            if (contenido == '[]') {
                return 'No hay productos.';
            // Si hay productos, busca el id
            } else {
                const listaProductos = JSON.parse(contenido);
                const encontrado = listaProductos.find(prod => prod.id == id);
                // Si encontró retorna un objeto
                if (encontrado) {
                    return encontrado;
                }
                // Si no se encuentra el ID retorna null
                return null;
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
    async readAll() {
        try {
            const contenido = await promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna un mensaje
            if (contenido == '[]') {
                return 'No hay productos.';
            // Si hay productos los retorna
            } else {
                const listaProductos = JSON.parse(contenido);
                return listaProductos;
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    // UPDATE
    async update(item) {
        const objs = await this.readAll()
        const index = objs.findIndex(o => o.id === item.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = item
            try {
                await promises.writeFile(this.file, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    // DELETE
    async deleteId(id) {
        const objs = await this.readAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await promises.writeFile(this.file, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
    async deleteAll() {
        try {
            const contenido = await promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna un mensaje
            if (contenido == '[]') {
                return 'No hay productos que borrar.';
            // Si hay productos borrar todo reescribiendo el archivo sin productos
            } else {
                await promises.writeFile(this.file, '');
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
}

export default FileContainer;