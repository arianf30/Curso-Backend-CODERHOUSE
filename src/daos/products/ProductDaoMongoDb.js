import MongoContainer from '../../containers/MongoContainer.js'
import Product from '../../models/Product.js'

class ProductDaoMongoDb extends MongoContainer {
  constructor () {
    super(Product)
  }
}

export default ProductDaoMongoDb
