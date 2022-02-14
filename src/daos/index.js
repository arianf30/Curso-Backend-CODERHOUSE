let instance = null

class PersistenceFactory {
  constructor () {
    this.value = Math.random(2)
  }

  async getPersistenceMethod (pers) {
    switch (pers) {
      case 'mongodb':
        // eslint-disable-next-line no-case-declarations
        const { default: ProductDaoMongoDb } = await import('./products/ProductDaoMongoDb.js')

        this.productDao = new ProductDaoMongoDb()
    }
  }

  static async getInstance (pers) {
    if (!instance) {
      instance = new PersistenceFactory()
      await instance.getPersistenceMethod(pers)
    }
    return instance
  }
}

export default PersistenceFactory
