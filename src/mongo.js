import mongoose from 'mongoose'
import config from './config.js'

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
  .then(() => {
    console.log('Database connected.')
  })
  .catch(err => {
    console.error(err)
  })
