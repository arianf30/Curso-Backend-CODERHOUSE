const express = require('express')
const compression = require('compression')
const logger = require('./logger')

const numCPUs = require('os').cpus().length;
const PORT = 4000;
const app = express();

app.use(compression());

app.get('/info', (req, res) => {
  logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`);

  // console.log('CODIGO SINCRONICO (demora tiempo y bloquea la ejecucion de las siguentes lineas)');

  res.send(`
    <br>Servidor express en ${PORT} -<br>
    <b>PID ${process.pid}</b><br>
    -${new Date().toLocaleString()}<br>
    Cantidad de procesadores: ${numCPUs}
  `);
});


app.listen(PORT, err => {
  if (!err) {
    console.log('Servidor corriendo en el puerto: ', PORT);
  }
})