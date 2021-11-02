// Constantes de servidor express
const express = require('express');
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

// Models
const { getMessages, saveMessage } = require('./src/models/messages');
const { getAllProducts, createProduct, deleteProductById, getProductById } = require('./src/models/products');
const { getCartById, createCart, deleteCartById, getAllCarts, addToCart, deleteToCart } = require('./src/models/carts');

// Routers
const productsRouter = require('./src/routers/products');
const cartsRouter = require('./src/routers/carts');

// Usar plantillas Ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Para recibir datos en JSON desde HTTP
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use Routers
app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);

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
    const carts = await getAllCarts();
    const products = await getAllProducts();
    const messages = getMessages();
    socket.emit('cart', carts);
    socket.emit('products', products);
    socket.emit('messages', messages);

    // Nuevo carrito
    socket.on('new-cart', async (cart) => {
        const nuevoId = await createCart(cart);

        const carts = await getAllCarts();
        io.sockets.emit('cart', carts);
    })
    // Borrar Carrito
    socket.on('delete-cart', async (id) => {
        await deleteCartById(id);

        const carts = await getAllCarts();
        io.sockets.emit('cart', carts);
    })

    // Agregar al carrito
    socket.on('add-to-cart', async (data) => {
        const { id, product_id } = data;
        const product = await getProductById(product_id);
        await addToCart(id, product);

        const carts = await getAllCarts();
        io.sockets.emit('cart', carts);
    })
     // Eliminar del carrito
     socket.on('delete-to-cart', async (data) => {
        const { id, product_id } = data;
        const product = await getProductById(product_id);
        await deleteToCart(id, product);

        const carts = await getAllCarts();
        io.sockets.emit('cart', carts);
    })

    // Nuevo producto
    socket.on('new-product', async (product) => {
        await createProduct(product);

        const products = await getAllProducts();
        io.sockets.emit('products', products);
    })

    // Borrar producto
    socket.on('delete-product', async (product) => {
        await deleteProductById(product);

        const products = await getAllProducts();
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
const PORT = 4000;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP con Websocket escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`));