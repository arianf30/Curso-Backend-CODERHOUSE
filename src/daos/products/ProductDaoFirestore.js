const FirestoreContainer = require("../../containers/FirestoreContainer");
const config = require("../../../config");

class ProductDaoFirestore extends FirestoreContainer {
    constructor () {
        super('products', config.firestore)
    }
}

module.exports = ProductDaoFirestore;