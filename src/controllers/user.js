import bcrypt from 'bcrypt'
import User from '../models/User.js'
import nodemailer from 'nodemailer'
import jsonwebtoken from 'jsonwebtoken'

// Login User
export const loginUser = async (req, res) => {
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
}

// All Users
export const getAll = async (req, res, next) => {
  try {
    const listUsers = await User.find({}).populate('products', {
      title: 1,
      _id: 0
    })
    res.json(listUsers)
  } catch (error) {
    return next(error)
  }
}

// Sign Up
export const signupUser = async (req, res, next) => {
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
}

// Delete By ID
export const deleteUser = async (req, res, next) => {
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
}

// Editar un usuario
export const editUser = async (req, res, next) => {
  const { userId, newUser } = req.body

  try {
    await User.findOneAndUpdate({ _id: userId }, newUser)
    res.json(`Producto ${userId} editado correctamente.`)
  } catch (error) {
    return next(error)
  }
}
