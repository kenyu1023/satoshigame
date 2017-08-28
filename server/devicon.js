import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const DevIconSchema = new mongoose.Schema({
  dname: String,
  dimage: String,
  durl: String,
})

const DevIcon = mongoose.model('DevIcon', DevIconSchema)

export default DevIcon