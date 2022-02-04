import express from 'express'
import { Server as HttpServer } from 'http'

// Import Middlewares
import cors from 'cors'
import handleErrors from './middlewares/handleErrors.js'

// Import Routers
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/users.js'
import cartsRouter from './controllers/carts.js'
import productsRouter from './controllers/products.js'

export const app = express()

const httpServer = new HttpServer(app)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routers
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

// Middleware Errores
app.use(handleErrors)

// Not Found
app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({
    error: 'Not found'
  })
})

export default httpServer
