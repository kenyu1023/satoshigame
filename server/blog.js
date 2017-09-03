import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const BlogSchema = new mongoose.Schema({
  btitle: String,
  bcontent: String,
  bimage: Array,
  bmainimage: String,
  bdate: String
})

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog