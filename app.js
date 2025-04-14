const express = require('express')
const productsRouter = require('./controllers/products')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const MONGODB_URI = require('./utils/config').MONGODB_URI

const app = express()

mongoose.set('strictQuery', false)
console.log('Connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connectiong to MongoDB', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/products', productsRouter)
app.use(middleware.unknownEndPoint)

module.exports = app;
