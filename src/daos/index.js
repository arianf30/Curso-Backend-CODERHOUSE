const ProductDaoMongoDb = require('./products/ProductDaoMongoDb');
const ProductDaoMemory = require('./products/ProductDaoMemory');
const ProductDaoFirestore = require('./products/ProductDaoFirestore');
const ProductDaoFile = require('./products/ProductDaoFile');

const daos = {}
if (process.env.STORAGE === 'mongodb') {
  daos['selectDao'] = ProductDaoMongoDb;
}

if (process.env.STORAGE === 'memory') {
  daos['selectDao'] = ProductDaoMemory;
}

if (process.env.STORAGE === 'firestore') {
  daos['selectDao'] = ProductDaoFirestore;
}

if (process.env.STORAGE === 'file') {
  daos['selectDao'] = ProductDaoFile;
}

module.exports = daos;