import './env.js'
import './mongo.js'

import httpServer from './server.js'

// Enciendo el app
const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`))
