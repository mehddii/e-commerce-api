const express = require("express")
const app = express()

app.get('/api/products', (request, response) => {
  response.status(200).end()
})

module.exports = app;
