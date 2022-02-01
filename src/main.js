import './env.js'
import './mongo.js'

import httpServer, { app } from './server.js'

app.get('/', (req, res) => {
  res.render('pages/index', {
    titulo: 'Ingrese un producto'
  })
})

app.use(function (req, res, next) {
  res.status(404).send({ Error: 404, Descripcion: 'Perdón pero esta página no existe. Error 404.' })
})

// Enciendo el app
const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))
