/* const http = require('http');

const server = http.createServer((solicitud, respuesta) => {
    respuesta.end('hola mundos!');
})

const serverConectado = server.listen(8080, () => {
    console.log(`SERVER ANDANDO ${server.address().port}`);
}) */

const express = require('express');

const server = express();

const PORT = 8080;

const PATH = '/';

const callback = (request, response, next) => {
    response.send({ mensaje: 'HOLA MUNDO' });
};
const callbackInit = () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
};

server.get(PATH, callback);

server.listen(PORT, callbackInit);

server.on('Error', (error) => {
    console.log('Error: ', error);
});