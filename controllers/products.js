const productsRouter = require('express').Router()
const middleware = require('../utils/middleware') 
const Product = require('../models/product')

productsRouter.get('/', (request, response) => {
  Product
    .find({})
    .then(products => {
      response.json(products)
    })
})

productsRouter.get('/:id', (request, response) => {
  Product
    .findById(request.params.id)
    .then(product => {
      if (product) {
        response.json(product)
      } else {
        response.status(404).end()
      }
    })  
})

productsRouter.post('/', (request, response) => {
  const body = request.body  
  
  const product = new Product({
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.category,
    stock: body.stock 
  })
  
  product
    .save()
    .then(product => {
      response.status(201).json(product)
    })
})

productsRouter.delete('/:id', (request, response) => {
  Product
    .findByIdAndDelete(request.params.id)
    .then(product => {
      response.status(204).end()
    })
})


productsRouter.put('/:id', (request, response) => {
  const body = request.body
  
  Product
    .findById(request.params.id)
    .then(product => {
      if (!product) {
        return response.status(404).end()
      }
      
      product.name = body.name
      product.description = body.description
      product.price = body.price
      product.category = body.category
      product.stock = body.stock
     
      product
        .save()
        .then(updatedProduct => {
          response.json(updatedProduct)
        })
    })
})

productsRouter.use(middleware.unknownEndPoint)

module.exports = productsRouter
