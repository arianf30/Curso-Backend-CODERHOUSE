import MemoryContainer from "../../containers/MemoryContainer";

class ProductDaoMemory extends MemoryContainer {
    constructor () {
        super('products');
    }
}

export default ProductDaoMemory;