import { Router } from 'express'
import userExtractor from '../middlewares/userExtractor.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

// /api/products
const productsRouter = new Router()

// Create Product
productsRouter.post('/', userExtractor, async (req, res, next) => {
  const { userId } = req
  const { title, price, thumbnail } = req.body

  const user = await User.findById(userId)

  if (!user) {
    return next({ name: 'UserDeleted' })
  }

  const newProduct = new Product({
    title,
    price,
    thumbnail,
    user: userId
  })

  try {
    const savedProduct = await newProduct.save()

    user.products = user.products.concat(savedProduct._id)
    await user.save()

    res.json(savedProduct)
  } catch (error) {
    return next(error)
  }
})

// All Products
productsRouter.get('/', async (req, res, next) => {
  try {
    const listProducts = await Product.find({}).populate('user', {
      email: 1,
      _id: 0
    })
    res.json(listProducts)
  } catch (error) {
    return next(error)
  }
})

// Product By ID
productsRouter.get('/:productId', async (req, res, next) => {
  const { productId } = req.params
  try {
    const listProducts = await Product.findById(productId).populate('user', {
      email: 1,
      _id: 0
    })
    res.json(listProducts)
  } catch (error) {
    return next(error)
  }
})

// Delete By ID
productsRouter.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params
  try {
    const { deletedCount } = await Product.deleteOne({ _id: productId })
    if (deletedCount === 0) {
      return res.statud(401).json({ error: 'Error al borrar: no encontrado' })
    }
    res.json({ estado: `Se eliminó el producto con ID: ${productId}` })
  } catch (error) {
    return next(error)
  }
})

// Editar un producto
productsRouter.put('/', async (req, res, next) => {
  const { productId, newProduct } = req.body

  try {
    await Product.findOneAndUpdate({ _id: productId }, newProduct)
    res.json(`Producto ${productId} editado correctamente.`)
  } catch (error) {
    return next(error)
  }
})

export default productsRouter
