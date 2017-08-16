import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const WorkSchema = new mongoose.Schema({
  wtitle: String,
  wurl: String,
  wfile: String,
  wembed: String,
  wicons: Object,
  wcontent: String,
  bdate: String
})

const Work = mongoose.model('Work', WorkSchema)

export default Work