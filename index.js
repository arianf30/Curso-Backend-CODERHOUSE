// Constantes de servidor express
const express = require('express');
const server = express();
const PORT = 8080;

// Routers
const productosRouter = require('./routers/productos');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));

server.use('/api/productos', productosRouter);

// Enciendo el server
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));

// Manejo de errores
server.on('Error', (error) => console.log('Error: ', error));