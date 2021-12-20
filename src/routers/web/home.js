import { Router } from 'express'
import { webAuth } from '../../auth/index.js'


import path from 'path'

const webRouter = new Router()

webRouter.get('/', (req, res) => {
    res.redirect('/home')
})

webRouter.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {
        nombre: req.user.username,
        email: req.user.email
    })
})

webRouter.get('/signup', (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/signup.ejs'))
})

webRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

export default webRouter