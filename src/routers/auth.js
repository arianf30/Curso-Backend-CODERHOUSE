import express from 'express'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

// CONEXION MONGO
import mongoose from 'mongoose'
import config from '../config'
const connectMongoose = async () => {
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
}
connectMongoose()
const userColection = mongoose.model('users', User)

const { Router } = express

const usuarios = []

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
passport.use(new Strategy(opts, function (jwtPayload, done) {
  User.findOne({ id: jwtPayload.sub }, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
      // or you could create a new account
    }
  })
}))

// --------------------------------------------
// configuro router de authentication
const authRouter = new Router()

authRouter.get('/users', async (req, res) => {
  await userColection.find({})
  return res.json()
})

// authRouter.post('/login', (req, res) => {
//   const user = usuarios.find(usuario => usuario.username === req.body.username)
//   if (!user) return res.status(400).json({ message: 'User not exist' })

//   const success = user.password === req.body.password // En caso de usar filter linea 25 -> user[0]
//   if (!success) return res.status(400).json({ message: 'Mail or Password was wront' })

//   user.count = 0
//   const token = jwt.sign(user, 'secret')

//   return res.status(200).json({ user, token })
// })

// authRouter.post('/sign-up', (req, res) => {
//   const count = usuarios.filter(usuario => usuario.username === req.body.username).length
//   if (count) return done(null, false)

//   const user = req.body
//   user.count = 0
//   usuarios.push(user)
//   return res.status(200).json({ user })
// })

// authRouter.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json(req.user.profile)
// })

export default authRouter
