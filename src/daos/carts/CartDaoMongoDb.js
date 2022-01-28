// import MongoContainer from "../../containers/MongoContainer";
// import { Schema } from "mongoose";
// import { mongodb } from "../../../config";

// class CartDaoMongoDb extends MongoContainer {
//     constructor () {
//         super('carts', new Schema({
//             name: { type: String, required: true },
//             description: { type: String, required: true },
//             code: { type: Number, required: true },
//             photo: { type: String, required: true },
//             price: { type: Number, required: true },
//             stock: { type: Number, required: true },
//         }), mongodb )
//     }
// }

// export default CartDaoMongoDb;

import MongoContainer from "../../containers/MongoContainer.js"

class CartDaoMongoDb extends MongoContainer {
    constructor () {
        super('carts', {
            products: { type: [], required: true }
        })
    }

    // async create(carrito = { products: [] }) {
    //     return super.create(carrito)
    // }
}

export default CartDaoMongoDb;