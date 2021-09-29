const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('./productos.json');

contenedor.save({
    nombre: 'Producto prueba 3'
})