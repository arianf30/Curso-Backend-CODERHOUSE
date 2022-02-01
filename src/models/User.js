import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: String,
  name: String,
  passwordHash: String,
  notes: [Array]
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
