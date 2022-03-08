import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import { createProduct, deleteById, editProduct, getAll, productById } from '../controllers/productGraphQL.js'

const productSchema = buildSchema(`
  type Query {
    getProduct(id: Int): Product
    getProducts: [Product]
  }
  type Mutation {
    createProduct(
      title: String!
      price: Int!
      thumbnail: String!
    ): Product,
    updateProduct(
      id: Int!,
      title: String
      price: Int
      thumbnail: String
    ): Product,
    deleteProduct(
      id: Int!
    ): Product,                            
  },
  type Product {
    id: Int
    title: String
    price: Int
    thumbnail: String
  }    
`)

const productosRouterGraphQl = graphqlHTTP({
  schema: productSchema,
  rootValue: {
    getProduct: ({ id }) => productById(id),
    getProducts: () => getAll(),
    createProduct: (data) => createProduct(data),
    updateProduct: (data) => editProduct(data),
    deleteProduct: ({ id }) => deleteById(id)
  },
  graphiql: true
})

export default productosRouterGraphQl
