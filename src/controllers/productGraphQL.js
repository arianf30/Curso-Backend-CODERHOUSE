import Product from '../models/Product.js'

// Create Product
export const createProduct = async (nuevoElem) => {
  const { title, price, thumbnail } = nuevoElem

  const newProduct = new Product({
    title,
    price,
    thumbnail
  })

  const savedProduct = await newProduct.save()
  return savedProduct
}

// All Products
export const getAll = async () => {
  const listProducts = await Product.find({}).populate('user', {
    email: 1,
    _id: 0
  })
  return listProducts
}

// Product By ID
export const productById = async (id) => {
  const { productId } = id
  const listProducts = await Product.findById(productId).populate('user', {
    email: 1,
    _id: 0
  })
  return listProducts
}

// Delete By ID
export const deleteById = async (id) => {
  const { productId } = id
  const { deletedCount } = await Product.deleteOne({ _id: productId })
  return deletedCount
}

// Editar un producto
export const editProduct = async (product) => {
  const { productId, newProduct } = product
  return await Product.findOneAndUpdate({ _id: productId }, newProduct)
}
