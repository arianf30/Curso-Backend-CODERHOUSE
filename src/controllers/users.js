import express from 'express'
import User from '../models/User.js'
import { asPOJO } from '../utils/objectUtils.js'
import bcrypt from 'bcrypt'

const { Router } = express

const usersRouter = new Router()

// LISTADO DE USUARIO
usersRouter.get('/list', async (req, res) => {
  try {
    const listUsers = await User.find({})
    const jsonList = listUsers.map(asPOJO)
    res.json(jsonList)
  } catch (error) {
    res.status(500).send('Something broke!')
  }
})

// REGISTRO DE UNA PERSONA
usersRouter.post('/signup', async (req, res) => {
  const { body } = req
  const { email, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    email,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  // res.json((await userDao.readAll()))
})

export default usersRouter
