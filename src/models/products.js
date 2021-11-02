const Contenedor = require('../../Contenedor');
const productosContenedor = new Contenedor('./data/products.json');

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