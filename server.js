// Constantes de servidor express
const express = require('express');
const faker = require('faker');
const cors = require('cors');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer, {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": true
            });
            res.end();
        }
    }
});

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
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Definir dirección estatica
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pages/index', {
        titulo: 'Ingrese un producto'
    });
});

app.get('/api/products-test', (req, res) => {
    const products = [...new Array(5)].map((_, index) => ({
        id: index,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }))
    res.json(products);
})

// Enciendo el Socket
io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado');

    // Traer productos y mensajes
    const products = await productosContenedor.getAll();
    const messages = await getMessages();
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
        await saveMessage(message);

        const messages = await getMessages();
        io.sockets.emit('messages', messages);
    })
})

// Enciendo el app
const PORT = 4000;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP con Websocket escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`));