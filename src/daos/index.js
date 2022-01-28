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
    default:
        // const { default: ProductDaoFile } = await import('./products/ProductDaoFile.js')
        // const { default: CartDaoFile } = await import('./carts/CartDaoFile.js')
        
        // productDao = new ProductDaoFile()
        // cartDao = new CartDaoFile()
        break
}

export { productDao, cartDao }