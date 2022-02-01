import MongoContainer from '../containers/MongoContainer.js'

class CartDaoMongoDb extends MongoContainer {
  constructor () {
    super('carts', {
      products: { type: [], required: true }
    })
  }
}

export default CartDaoMongoDb
