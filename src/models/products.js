const Contenedor = require('../../Contenedor');
const { mysqlOptions } = require('../../data/databases');
const productosContenedor = new Contenedor(mysqlOptions, 'products');

const getAllProducts = async () => {
  const list = await productosContenedor.getAll();
  return list;
}

const getProductById = async (paramId) => {
  const prod = await productosContenedor.getById(paramId);
  return prod;
}

const createProduct = async (newProduct) => {
  const idSave = await productosContenedor.save(newProduct);
  return idSave;
}

const editProduct = async (editProduct) => {
  const idEdit = await edit(editProduct);
  return idEdit;
}

const deleteProductById = async (paramId) => {
  const prod = await productosContenedor.deleteById(paramId);
  return prod;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProductById
}