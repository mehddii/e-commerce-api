const productsRouter = require('express').Router()
const middleware = require('../utils/middleware') 

let products = [
  {
    "id": "1", 
    "name": "Wireless Headphones",
    "price": 79.99,
    "category": "Electronics"
  },
  {
    "id": "2",
    "name": "Running Shoes",
    "price": 59.50,
    "category": "Shoes"
  },
  {
    "id": "3",
    "name": "Scented Candle",
    "price": 12.00,
    "category": "Home Goods"
  }
] 

const generateId = () => {
  return products.length + 1
}

productsRouter.get('/', (request, response) => {
  response.json(products)
})

productsRouter.get('/:id', (request, response) => {
  const id = request.params.id
  const product = products.find(p => p.id === id)
  
  if (product) {
    return response.json(product)  
  } else {
    return response.status(404).end()
  }
})

productsRouter.post('/', (request, response) => {
  const body = request.body  
  
  if (!body.name || !body.price || !body.category) {
    return response.status(400).json(
      {
        error: 'Content missing'
      }
    )
  }
  
  product = {
    id: String(generateId()),
    name: body.name,
    price: body.price,
    category: body.category
  }
  
  products = products.concat(product)
  response.status(201).json(product)
})

productsRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  products = products.filter(p => p.id !== id)
  
  response.status(204).end()
})


productsRouter.put('/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  const product = products.find(p => p.id === id)
  
  if (!body.name || !body.price || !body.category) {
    return response.status(400).json(
      {
        error: 'Content missing'
      }
    )
  }

  if (!product) {
    return response.status(404).end()
  } 

  product.name = body.name
  product.price = body.price
  product.category = body.category

  response.json(product)
})

productsRouter.use(middleware.unknownEndPoint)

module.exports = productsRouter
