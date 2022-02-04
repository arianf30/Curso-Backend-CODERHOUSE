import { Router } from 'express'
import userExtractor from '../middlewares/userExtractor.js'
import Cart from '../models/Cart.js'
import User from '../models/User.js'

// /api/carts
const cartsRouter = new Router()

// Create Cart
cartsRouter.post('/', userExtractor, async (req, res, next) => {
  const { userId } = req
  const user = await User.findById(userId)
  if (!user) return next({ name: 'UserDeleted' })

  const newCart = new Cart({
    status: 'Inicializado',
    initDate: new Date(),
    user: userId
  })

  try {
    const savedCart = await newCart.save()
    user.carts = [...user.carts, savedCart._id]
    await user.save()
    res.json(savedCart)
  } catch (error) {
    return next(error)
  }
})

// All Carts
cartsRouter.get('/', async (req, res, next) => {
  try {
    const listCarts = await Cart.find({}).populate('user', {
      email: 1,
      _id: 0
    })
    res.json(listCarts)
  } catch (error) {
    return next(error)
  }
})

// Cart By ID
cartsRouter.get('/:cartId', async (req, res, next) => {
  const { cartId } = req.params
  try {
    const listCarts = await Cart.findById(cartId).populate('user', {
      email: 1,
      _id: 0
    })
    res.json(listCarts)
  } catch (error) {
    return next(error)
  }
})

// Carts By User ID
cartsRouter.get('/user/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const listCarts = await Cart.find({ user: userId })
    res.json(listCarts)
  } catch (error) {
    return next(error)
  }
})

// Active Carts By User ID
cartsRouter.get('/user/:userId/active', async (req, res, next) => {
  const { userId } = req.params
  try {
    const listCarts = await Cart.findOne({ user: userId, status: 'Inicializado' }, null, { sort: { initDate: -1 } })
    res.json(listCarts)
  } catch (error) {
    return next(error)
  }
})

// Add Product to Cart by User ID
cartsRouter.post('/add', userExtractor, async (req, res, next) => {
  const { productId, addCount } = req.body
  const { userId } = req
  const user = await User.findById(userId)
  if (!user) return next({ name: 'UserDeleted' })

  const cart = await Cart.findOne({ user: userId, status: 'Inicializado' }, {
    status: 0,
    initDate: 0,
    user: 0,
    __v: 0
  }, { sort: { initDate: -1 } })

  const productFoundIndex = cart.products.findIndex(item => item.id === productId)
  productFoundIndex >= 0
    ? cart.products[productFoundIndex].count = cart.products[productFoundIndex].count + addCount
    : cart.products.push({ id: productId, count: addCount })

  try {
    await Cart.findOneAndUpdate({ _id: cart.id }, { products: cart.products })
    res.end('Producto añadido al carrito')
  } catch (error) {
    next(error)
  }
})

// Remove Product to Cart by User ID
cartsRouter.post('/remove', userExtractor, async (req, res, next) => {
  const { productId } = req.body
  const { userId } = req
  const user = await User.findById(userId)
  if (!user) return next({ name: 'UserDeleted' })

  const cart = await Cart.findOne({ user: userId, status: 'Inicializado' }, {
    status: 0,
    initDate: 0,
    user: 0,
    __v: 0
  }, { sort: { initDate: -1 } })

  const productsFilter = cart.products.filter(item => item.id !== productId)

  try {
    await Cart.findOneAndUpdate({ _id: cart.id }, { products: productsFilter })
    res.end('Producto removido del carrito')
  } catch (error) {
    next(error)
  }
})

// Finalizar Compra - Cerrar Carrito
cartsRouter.post('/finalizar', userExtractor, async (req, res, next) => {
  const { products } = req.body
  const { userId } = req
  const user = await User.findById(userId)
  if (!user) return next({ name: 'UserDeleted' })

  const newCart = new Cart({
    status: 'Pagado',
    products: products,
    initDate: new Date(),
    user: userId
  })

  try {
    const savedCart = await newCart.save()
    user.carts = [...user.carts, savedCart._id]
    await user.save()
    res.json(savedCart)
  } catch (error) {
    return next(error)
  }
})

// Editar un carrito
cartsRouter.put('/', async (req, res, next) => {
  const { cartId, newCart } = req.body

  try {
    await Cart.findOneAndUpdate({ _id: cartId }, newCart)
    res.json(`Producto ${cartId} editado correctamente.`)
  } catch (error) {
    return next(error)
  }
})

export default cartsRouter
