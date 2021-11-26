const FirestoreContainer = require("../../containers/FirestoreContainer");
const config = require("../../../config");

class CartDaoFirestore extends FirestoreContainer {
    constructor () {
        super('carts', config.firestore )
    }
}

module.exports = CartDaoFirestore;