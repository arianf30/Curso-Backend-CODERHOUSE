/* const http = require('http');

const server = http.createServer((solicitud, respuesta) => {
    respuesta.end('hola mundos!');
})

const serverConectado = server.listen(8080, () => {
    console.log(`SERVER ANDANDO ${server.address().port}`);
}) */

// Constantes de servidor express
const express = require('express');
const server = express();
const PORT = 8080;

// Clase de productos
const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('./productos.json');

// Variables extras
const obtenerRandom = (min, max) => Math.round(Math.random() * (max - min));

// Endpoint inicial
const PATH = '/';
const callback = (request, response, next) => {
    response.send({ mensaje: 'HOLA MUNDO' });
};
server.get(PATH, callback);

// Endpoint productos
server.get('/productos', async (req, resp) => {
    const productos = await contenedor.getAll();
    resp.json(productos)
});

// Endpoint productosRandom
server.get('/productoRandom', async (req, resp) => {
    const productos = await contenedor.getAll();
    const posicionRandom = obtenerRandom(0, productos.length - 1);
    resp.json(productos[posicionRandom])
});


// Enciendo el server
const callbackInit = () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT, callbackInit);

// Manejo de errores
server.on('Error', (error) => {
    console.log('Error: ', error);
});