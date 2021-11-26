const MemoryContainer = require("../../containers/MemoryContainer");

class CartDaoMemory extends MemoryContainer {
    constructor () {
        super('carts');
    }
}

module.exports = CartDaoMemory;