import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  status: Number
})

const User = mongoose.model('User', UserSchema)

export default User