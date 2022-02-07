import express from 'express'
import { Server as HttpServer } from 'http'
import router from './routers/index.js'

// Import Middlewares
import cors from 'cors'
import handleErrors from './middlewares/handleErrors.js'

export const app = express()

const httpServer = new HttpServer(app)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', router)

// Middleware Errores
app.use(handleErrors)

// // Not Found
// app.use((req, res) => {
//   console.log(req.path)
//   res.status(404).json({
//     error: 'Not found'
//   })
// })

export default httpServer
