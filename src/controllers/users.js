import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/User.js'
import nodemailer from 'nodemailer'

// /api/users
const usersRouter = new Router()

// All Users
usersRouter.get('/', async (req, res, next) => {
  try {
    const listUsers = await User.find({}).populate('products', {
      title: 1,
      _id: 0
    })
    res.json(listUsers)
  } catch (error) {
    return next(error)
  }
})

// Sign Up
usersRouter.post('/signup', async (req, res, next) => {
  const { body } = req
  const { email, name, password, address, phone } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    email,
    name,
    passwordHash,
    address,
    phone
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    return next(error)
  }

  // Send Email
  async function sendEmail () {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'arianfernandez@gmail.com',
        pass: process.env.KEY_GMAIL
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Back Arián" <arian@back.com>',
      to: process.env.EMAIL_ADMIN,
      subject: 'Nuevo registro ✔',
      html: `<div>
      <p>El nuevo usuario es:</p>
      <p>Email: <b>${user.email}</b></p>
      <p>Nombre: <b>${user.name}</b></p>
      <p>Dirección: <b>${user.address}</b></p>
      <p>Celular: <b>${user.phone}</b></p>
      </div>` // html body
    })

    console.log('Message sent: %s', info.messageId)
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }
  sendEmail().catch(console.error)
})

// Delete By ID
usersRouter.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const { deletedCount } = await User.deleteOne({ _id: userId })
    if (deletedCount === 0) {
      return res.statud(401).json({ error: 'Error al borrar: no encontrado' })
    }
    res.json({ estado: `Se eliminó el usuario con ID: ${userId}` })
  } catch (error) {
    return next(error)
  }
})

// Editar un usuario
usersRouter.put('/', async (req, res, next) => {
  const { userId, newUser } = req.body

  try {
    await User.findOneAndUpdate({ _id: userId }, newUser)
    res.json(`Producto ${userId} editado correctamente.`)
  } catch (error) {
    return next(error)
  }
})

export default usersRouter
