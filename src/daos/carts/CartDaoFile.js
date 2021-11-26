const FileContainer = require("../../containers/FileContainer");
const config = require("../../../config");

class ProductDaoFile extends FileContainer {
    constructor () {
        super(config.file.productFilePath)
    }
}

module.exports = ProductDaoFile;