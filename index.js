// Constantes de servidor express
const express = require('express');
const server = express();
const PORT = 8080;

// Clase de productos
const Contenedor = require('./Contenedor');
const productosContenedor = new Contenedor('data/productos.json');

// Routers
const productosRouter = require('./routers/productos');

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));

server.use('/api/productos', productosRouter);

server.get('/', (req, res) => {
    res.render('pages/index', {
        titulo: 'Página de Inicio'
    });
});
server.get('/productos', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.render('pages/productos', {
        message: 'enviado',
        productos: lista
    });
});

// Enciendo el server
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));

// Manejo de errores
server.on('Error', (error) => console.log('Error: ', error));