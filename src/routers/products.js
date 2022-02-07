import { Router } from 'express'
import { createProduct, deleteById, editProduct, getAll, productById } from '../controllers/product.js'
import userExtractor from '../middlewares/userExtractor.js'

const productRouter = new Router()

productRouter.get('/', getAll)
productRouter.post('/', userExtractor, createProduct)
productRouter.get('/:productId', productById)
productRouter.delete('/:productId', deleteById)
productRouter.put('/', editProduct)

export default productRouter
