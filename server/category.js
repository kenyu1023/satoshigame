import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const CategorySchema = new mongoose.Schema({
  cname: String,
})

const Category = mongoose.model('Category', CategorySchema)

export default Category