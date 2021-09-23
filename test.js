const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('./producto.json');

/* ----- ELEMENTOS ----- */
// Producto a agregar
const producto1 = {
    nombre: 'TV Samsung',
    precio: 50000,
    moneda: 'ars'
};
const producto2 = {
    nombre: 'Iphone 13',
    precio: 1200,
    moneda: 'usd'
};
const producto3 = {
    nombre: 'Lavarropas',
    precio: 42000,
    moneda: 'ars'
};
const producto4 = {
    nombre: 'Plancha',
    precio: 14000,
    moneda: 'ars'
};


/* ----- FUNCIONES ----- */
// FUNCTIÓN SAVE
const funcSave = async (producto) => {
    const id = await contenedor.save(producto);
    console.log(id);
};

// FUNCIÓN GETBYID
const funcGetById = async (id) => {
    const productoId = await contenedor.getById(id);
    console.log(productoId);
};

// FUNCIÓN GETALL
const funcGetAll = async () => {
    const productos = await contenedor.getAll();
    console.log(productos);
};

// FUNCIÓN DELETEBYID
const funcDeleteById = async (id) => {
    const productos = await contenedor.deleteById(id);
};

// FUNCIÓN DELETEALL
const funcDeleteAll = async () => {
    const productos = await contenedor.deleteAll();
};


/* ----- EJECUTAR ----- */
funcSave(producto1);
//funcGetById(1);
//funcGetAll();
//funcDeleteById(1);
//funcDeleteAll();

