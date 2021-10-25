// Constantes de servidor express
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

// Clase de Mensajes
const { getMessages, saveMessage } = require('./models/messages/messages');
const Contenedor = require('./Contenedor');
const productosContenedor = new Contenedor('./data/productos.json');
/* const { getProducts, saveProduct } = require('./models/products/products'); */

// Usar plantillas Ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Para recibir datos en JSON desde HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir dirección estatica
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pages/index', {
        titulo: 'Ingrese un producto'
    });
});

// Enciendo el Socket
io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado');

    // Traer productos y mensajes
    const products = await productosContenedor.getAll();
    const messages = getMessages();
    socket.emit('products', products);
    socket.emit('messages', messages);

    // Nuevo producto
    socket.on('new-product', async (product) => {
        await productosContenedor.save(product);

        const products = await productosContenedor.getAll();
        io.sockets.emit('products', products);
    })

    // Nuevo mensaje
    socket.on('new-message', async (message) => {
        saveMessage(message);

        const messages = getMessages();
        io.sockets.emit('messages', messages);
    })
})

// Enciendo el app
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP con Websocket escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`));