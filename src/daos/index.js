const ProductDaoMongoDb = require('./products/ProductDaoMongoDb');
const ProductDaoMemory = require('./products/ProductDaoMemory');
const ProductDaoFirestore = require('./products/ProductDaoFirestore');
const ProductDaoFile = require('./products/ProductDaoFile');
const CartDaoMongoDb = require('./carts/CartDaoMongoDb');
const CartDaoMemory = require('./carts/CartDaoMemory');
const CartDaoFirestore = require('./carts/CartDaoFirestore');
const CartDaoFile = require('./carts/CartDaoFile');

const daos = {}
if (process.env.STORAGE === 'mongodb') {
  daos['selectDao'] = ProductDaoMongoDb;
  daos['selectDaoCart'] = CartDaoMongoDb;
}

if (process.env.STORAGE === 'memory') {
  daos['selectDao'] = ProductDaoMemory;
  daos['selectDaoCart'] = CartDaoMemory;
}

if (process.env.STORAGE === 'firestore') {
  daos['selectDao'] = ProductDaoFirestore;
  daos['selectDaoCart'] = CartDaoFirestore;
}

if (process.env.STORAGE === 'file') {
  daos['selectDao'] = ProductDaoFile;
  daos['selectDaoCart'] = CartDaoFile;
}

module.exports = daos;