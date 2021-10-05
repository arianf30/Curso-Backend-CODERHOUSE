const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }

    // FUNCIÓN PARA GUARDAR
    async save(producto) {
        try {
            let productos = [];
            // Traer productos
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos, el id será 1
            if (contenido === '') {
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
            await fs.promises.writeFile(this.file, productosString);
            // Retorna el id guardado
            return producto.id;   
        } catch ( error ) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA EDITAR
    async edit(producto) {
        try {
            // Traer productos
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            const listaProductos = JSON.parse(contenido);

            // NUEVO ARRAY
            var productosNuevo = listaProductos.map(item => {
                if (item.id === producto.id) {
                    return { ...producto }
                }
                return { ...item };
            });

            const productosString = JSON.stringify(productosNuevo, null, 2);
            await fs.promises.writeFile(this.file, productosString);
            // Retorna el id guardado
            return producto.id;
        } catch ( error ) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA RETORNAR UN ID ESPECÍFICO
    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna null
            if (contenido === '') {
                return 'No hay productos.';
            // Si hay productos, busca el id
            } else {
                const listaProductos = JSON.parse(contenido);
                const encontrado = listaProductos.find(prod => prod.id === id);
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
    
    // FUNCIÓN PARA RETORNAR TODOS LOS PRODUCTOS
    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna un mensaje
            if (contenido === '') {
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

    // FUNCIÓN PARA BORRAR UN PRODUCTO SEGÚN ID
    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna un mensaje
            if (contenido === '') {
                return 'No hay productos.';
            // Si hay productos buscar el id y lo elimina
            } else {
                const listaProductos = JSON.parse(contenido);
                const itemDelete = listaProductos.find(prod => prod.id === id);
                const indexDelete = listaProductos.indexOf(itemDelete);
                listaProductos.splice(indexDelete, 1);
                await fs.promises.writeFile(this.file, JSON.stringify(listaProductos, null, 2));
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA BORRAR TODOS LOS OBJETOS
    async deleteAll() {
        try {
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos retorna un mensaje
            if (contenido === '') {
                return 'No hay productos que borrar.';
            // Si hay productos borrar todo reescribiendo el archivo sin productos
            } else {
                await fs.promises.writeFile(this.file, '');
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
}

module.exports = Contenedor;