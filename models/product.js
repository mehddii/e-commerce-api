const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number 
}) 

productSchema.set('toJSON', {
  transform: (document, product) => {
    product.id = product._id.toString()
    delete product._id
    delete product.__v
  }
})

module.exports = mongoose.model('Product', productSchema)
