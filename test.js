const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('./producto.json');

const miProducto = {
    nombre: 'primero',
    precio: 500
};

contenedor.save(miProducto);
