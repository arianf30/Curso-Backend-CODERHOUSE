const MemoryContainer = require("../../containers/MemoryContainer");

class ProductDaoMemory extends MemoryContainer {
    constructor () {
        super('products');
    }
}

module.exports = ProductDaoMemory;