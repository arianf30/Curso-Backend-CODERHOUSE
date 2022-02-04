import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/User.js'
import jsonwebtoken from 'jsonwebtoken'

const loginRouter = new Router()

// Login
loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { email, password } = body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'Email o contraseña inválido'
    })
  }

  const userForToken = {
    id: user._id,
    email: user.email
  }
  const token = jsonwebtoken.sign(userForToken, process.env.SECRET)
  return res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    products: user.products,
    address: user.address,
    phone: user.phone,
    jwt: token
  })
})

export default loginRouter
