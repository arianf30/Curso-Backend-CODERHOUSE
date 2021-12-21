// Constantes de servidor express
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { Server as HttpServer } from 'http';
import webRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import MongoStore from 'connect-mongo';
import passport from 'passport'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app)

//--------------------------------------------
// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/coderhouse" }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// rutas del servidor web
app.use(webRouter)
app.use(homeWebRouter)


//--------------------------------------------
// inicio el servidor
mongoose.connect("mongodb://localhost:27017/coderhouse", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if(err) {
      console.error('Erro connection mongo');
    }

    const connectedServer = httpServer.listen(config.PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
})