const ContenedorCart = require('../../ContenedorCart');
const carritosContenedor = new ContenedorCart('./data/carts.json');

const getAllCarts = async () => {
  const list = await carritosContenedor.getAll();
  return list;
}

const getCartById = async (paramId) => {
  const cart = await carritosContenedor.getById(paramId);
  return cart;
}

const createCart = async (newCart) => {
  const idSave = await carritosContenedor.save(newCart);
  return idSave;
}

const editCart = async (editCart) => {
  const idEdit = await carritosContenedor.edit(editCart);
  return idEdit;
}

const deleteCartById = async (paramId) => {
  const cart = await carritosContenedor.deleteById(paramId);
  return cart;
}

const addToCart = async (id, product) => {
  const resp = await carritosContenedor.addToCart(id, product);
  return resp;
}

const deleteToCart = async (id, product) => {
  const resp = await carritosContenedor.deleteToCart(id, product);
  return resp;
}

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  editCart,
  deleteCartById,
  addToCart,
  deleteToCart
}