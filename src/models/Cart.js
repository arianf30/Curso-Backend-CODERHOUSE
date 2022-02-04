import mongoose from 'mongoose'
const { Schema } = mongoose

const cartSchema = new Schema({
  products: Array,
  status: String,
  initDate: Date,
  finishDate: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Cart = mongoose.model('carts', cartSchema)

export default Cart
