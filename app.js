const express = require("express")
const app = express()

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

app.use(express.json())

const generateId = () => {
  return products.length + 1
}

app.get('/api/products', (request, response) => {
  response.json(products)
})

app.get('/api/products/:id', (request, response) => {
  const id = request.params.id
  const product = products.find(p => p.id === id)
  
  if (product) {
    return response.json(product)  
  } else {
    return response.status(404).end()
  }
})

app.post('/api/products', (request, response) => {
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

app.delete('/api/products/:id', (request, response) => {
  const id = request.params.id
  products = products.filter(p => p.id !== id)
  
  response.status(204).end()
})


app.put('/api/products/:id', (request, response) => {
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

module.exports = app;
