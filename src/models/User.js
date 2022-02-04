import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    unique: true
  },
  passwordHash: String,
  name: String,
  address: String,
  age: Number,
  phone: Number,
  avatar: String,
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'carts'
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('users', userSchema)

export default User
