import { Router } from 'express'
import { activeCartByUserId, addToCart, cartById, cartByUserId, checkoutCart, createCart, editCart, getCarts, removeToCart } from '../controllers/cart.js'
import userExtractor from '../middlewares/userExtractor.js'

const cartRouter = new Router()

cartRouter.post('/', userExtractor, createCart)
cartRouter.get('/', getCarts)
cartRouter.get('/:cartId', cartById)
cartRouter.get('/user/:userId', cartByUserId)
cartRouter.get('/user/:userId/active', activeCartByUserId)
cartRouter.post('/add', userExtractor, addToCart)
cartRouter.post('/remove', userExtractor, removeToCart)
cartRouter.post('/finalizar', userExtractor, checkoutCart)
cartRouter.put('/', editCart)

export default cartRouter
