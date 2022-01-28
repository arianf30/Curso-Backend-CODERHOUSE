import FileContainer from "../../containers/FileContainer.js";
import config from "../../config.js"

class CartDaoFile extends FileContainer {
    constructor () {
        super(`${config.FILE_PATH}${config.file.cartFilePath}`)
    }
}

export default CartDaoFile;