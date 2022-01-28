import FileContainer from "../../containers/FileContainer.js";
import config from "../../config.js"

class ProductDaoFile extends FileContainer {
    constructor () {
        super(`${config.FILE_PATH}${config.file.productFilePath}`)
    }
}

export default ProductDaoFile;