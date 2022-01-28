import express from 'express'
import cors from 'cors'

import authRouter from './routers/auth.js'
import cartsRouter from './routers/carts.js'
import productsRouter from './routers/products.js'
import { productDao, cartDao } from './daos/index.js'

import { Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'

//------------------------------------------------------------------------
// instancio servidor

export const app = express()

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

//--------------------------------------------
// configuro el servidor

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Usar plantillas Ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api/auth', authRouter)
app.use('/api/carritos', cartsRouter)
app.use('/api/productos', productsRouter)


// Enciendo el Socket
io.on('connection', async (socket) => {
  console.log('Nuevo usuario conectado');

  // Traer productos y carritos
  const carts = await cartDao.readAll();
  const products = await productDao.readAll();
  // const messages = getMessages();
  socket.emit('cart', carts);
  socket.emit('products', products);
  // socket.emit('messages', messages);

  // Nuevo carrito
  socket.on('new-cart', async (cart) => {
    const guardar = await cartDao.create(cart);
    console.log(guardar);
    const carts = await cartDao.readAll();
    io.sockets.emit('cart', carts);
  })
  // Borrar Carrito
  socket.on('delete-cart', async (id) => {
      await cartDao.deleteId(id);

      const carts = await cartDao.readAll();
      io.sockets.emit('cart', carts);
  })

  // Agregar al carrito
  socket.on('add-to-cart', async (data) => {
    const { id, product_id } = data;
    const cart = await cartDao.readId(id);
    const product = await productDao.readId(product_id);
    cart.products.push(product);
    await cartDao.update(cart);

    io.sockets.emit('cart', cart);
  })
  // Eliminar del carrito
  socket.on('delete-to-cart', async (data) => {
    const { id, product_id } = data;
    const product = await cartDao.read(product_id);
    await cartDao.deleteId(id, product);

    const carts = await cartDao.readAll();
    io.sockets.emit('cart', carts);
  })

  // Nuevo producto
  socket.on('new-product', async (product) => {
      await productDao.create(product);
      const products = await productDao.readAll();
      io.sockets.emit('products', products);
  })

  // Borrar producto
  socket.on('delete-product', async (product) => {
      await deleteProductById(product);

      const products = await readAllProducts();
      io.sockets.emit('products', products);
  })

  // // Nuevo mensaje
  // socket.on('new-message', async (message) => {
  //     saveMessage(message);

  //     const messages = getMessages();
  //     io.sockets.emit('messages', messages);
  // })
})

export default httpServer