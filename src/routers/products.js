import { Router } from 'express'
import { createProduct, deleteById, editProduct, getAll, productById } from '../controllers/product.js'
import PersistenceFactory from '../daos/index.js'
import getPersistence from '../utils/getPersistance.js'
import userExtractor from '../middlewares/userExtractor.js'

// const obj1 = await PersistenceFactory.getInstance().getPersistenceMethod(getPersistence())
// const obj2 = await PersistenceFactory.getInstance().getPersistenceMethod(getPersistence())

const obj1 = await PersistenceFactory.getInstance(getPersistence())
const obj2 = await PersistenceFactory.getInstance(getPersistence())

console.log('Son iguales: ', obj1 === obj2)
// console.log(obj1)
// console.log(obj2)

const { productDao: productsApi } = await PersistenceFactory.getInstance(getPersistence())

const productRouter = new Router()

productRouter.get('/', getAll)
productRouter.post('/', userExtractor, createProduct)
productRouter.get('/:productId', productById)
productRouter.delete('/:productId', deleteById)
productRouter.put('/', editProduct)

export default productRouter
