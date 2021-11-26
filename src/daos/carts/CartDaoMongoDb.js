const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require("mongoose");
const config = require("../../../config");

class ProductDaoMongoDb extends MongoContainer {
    constructor () {
        super('products', new Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: Number, required: true },
            photo: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        }), config.mongodb )
    }
}

module.exports = ProductDaoMongoDb;