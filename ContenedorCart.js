const fs = require('fs');

class ContenedorCart{
    constructor(file){
        this.file = file;
        const date = new Date();
        const day = (date.getDay().toString().length > 1) ? date.getDay() : `0${date.getDay()}`;
        const month = (date.getMonth().toString().length > 1) ? date.getMonth() : `0${date.getMonth()}`;
        const hours = (date.getHours().toString().length > 1) ? date.getHours() : `0${date.getHours()}`;
        const minutes = (date.getMinutes().toString().length > 1) ? date.getMinutes() : `0${date.getMinutes()}`;
        this.date = `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
    }

    // FUNCIÓN PARA GUARDAR
    async save(producto) {
        try {
            let productos = [];
            // Traer productos
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            // Si no hay productos, el id será 1
            if (contenido === '' || contenido === '[]') {
                producto.id = 1;
                producto.timestamp = this.date;
                productos.push(producto);
            // Si hay productos, el id será igual al id del último + 1
            } else {
                const listaProductos = JSON.parse(contenido);
                const ultimoID = listaProductos.length-1;
                producto.id = listaProductos[ultimoID].id + 1;
                producto.timestamp = this.date;
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
            const productosNuevo = listaProductos.map(item => {
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

    async addToCart(id, product) {
        try {
            // Traer lista de objetos
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            const listaCarritos = JSON.parse(contenido);

            // Filtrar Carrito Objetivo
            const nuevoCarrito = listaCarritos.map(elem => {
                if (elem.id === id) {
                    if (typeof elem.products !== 'undefined' && elem.products.length > 0){
                        const findP = elem.products.findIndex(prod => prod.id === product.id);
                        if (findP !== -1) {
                            const newQty = elem.products[findP].qty+1;
                            elem.products[findP] = { ...product, qty: newQty };
                            return { ...elem, products: [ ...elem.products ] }
                        } else {
                            return { ...elem, products: [ ...elem.products, { ...product, qty: 1 } ] }
                        }
                    } else {
                        return { ...elem, products: [ { ...product, qty: 1 } ]  }
                    }
                } else {
                    return { ...elem }
                }
            });

            // Buscar producto

            const carritosString = JSON.stringify(nuevoCarrito, null, 2);
            await fs.promises.writeFile(this.file, carritosString);
            // Retorna el id guardado
            return 'Añadido con éxito';
        } catch ( error ) {
            console.log('error: ', error);
        }
    }

    async deleteToCart(id, product) {
        try {
            // Traer lista de objetos
            const contenido = await fs.promises.readFile(this.file, 'utf-8');
            const listaCarritos = JSON.parse(contenido);

            // Filtrar Carrito Objetivo
            const nuevoCarrito = listaCarritos.map(elem => {
                if (elem.id === id) {
                    if (typeof elem.products !== 'undefined' && elem.products.length > 0) {
                        
                        const itemDelete = elem.products.find(prod => prod.id === product.id);
                        const indexDelete = elem.products.indexOf(itemDelete);
                        elem.products.splice(indexDelete, 1);

                        return { ...elem }
                    }
                } else {
                    return { ...elem }
                }
            });

            // Buscar producto

            if (nuevoCarrito) {
                const carritosString = JSON.stringify(nuevoCarrito, null, 2);
                await fs.promises.writeFile(this.file, carritosString);   
            }
            // Retorna el id guardado
            return 'Eliminado con éxito';
        } catch ( error ) {
            console.log('error: ', error);
        }
    }
}

module.exports = ContenedorCart;