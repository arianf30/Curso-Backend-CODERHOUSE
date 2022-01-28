import config from '../config.js'

let productDao
let cartDao

switch (config.PERS) {
    case 'json':
        const { default: ProductDaoFile } = await import('./products/ProductDaoFile.js')
        const { default: CartDaoFile } = await import('./carts/CartDaoFile.js')
        
        productDao = new ProductDaoFile()
        cartDao = new CartDaoFile()
        break
    case 'mongodb':
        const { default: ProductDaoMongoDb } = await import('./products/ProductDaoMongoDb.js')
        const { default: CartDaoMongoDb } = await import('./carts/CartDaoMongoDb.js')

        productDao = new ProductDaoMongoDb()
        cartDao = new CartDaoMongoDb()
        break
    default:
        // const { default: ProductDaoFile } = await import('./products/ProductDaoFile.js')
        // const { default: CartDaoFile } = await import('./carts/CartDaoFile.js')
        
        // productDao = new ProductDaoFile()
        // cartDao = new CartDaoFile()
        break
}

export { productDao, cartDao }