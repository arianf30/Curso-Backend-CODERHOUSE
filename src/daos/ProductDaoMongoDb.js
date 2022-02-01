import MongoContainer from '../containers/MongoContainer.js'

class ProductDaoMongoDb extends MongoContainer {
  constructor () {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true }
    })
  }
}

export default ProductDaoMongoDb
