import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = mongoose.model('products', productSchema)

export default Product
