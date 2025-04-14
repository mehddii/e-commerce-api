const express = require("express")
const productsRouter = require('./controllers/products')
const middleware = require('./utils/middleware')
const app = express()

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/products', productsRouter)
app.use(middleware.unknownEndPoint)

module.exports = app;
