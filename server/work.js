import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const WorkSchema = new mongoose.Schema({
  wtitle: String,
  wurl: String,
  wfile: String,
  wembed: String,
  wcategory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  wicons: [{type: mongoose.Schema.Types.ObjectId, ref: 'DevIcon'}],
  wcontent: String,
  bdate: String
})

const Work = mongoose.model('Work', WorkSchema)

export default Work