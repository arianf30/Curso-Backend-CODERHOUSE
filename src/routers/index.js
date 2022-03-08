import { Router } from 'express'

// Import Routers
import userRouter from './users.js'
import cartRouter from './carts.js'
// import productRouter from './products.js'
import productRouterGraphQL from '../routers/productsGraphQL.js'

const router = new Router()

// Routers
router.use('/users', userRouter)
router.use('/carts', cartRouter)
router.use('/products', productRouterGraphQL)

export default router
