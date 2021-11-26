const FileContainer = require("../../containers/FileContainer");
const config = require("../../../config");

class CartDaoFile extends FileContainer {
    constructor () {
        super(config.file.cartFilePath)
    }
}

module.exports = CartDaoFile;