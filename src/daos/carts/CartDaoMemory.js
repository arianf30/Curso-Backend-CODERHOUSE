import MemoryContainer from "../../containers/MemoryContainer";

class CartDaoMemory extends MemoryContainer {
    constructor () {
        super('carts');
    }
}

export default CartDaoMemory;