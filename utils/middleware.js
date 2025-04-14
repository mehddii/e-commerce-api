require('dotenv').config()
const morgan = require('morgan')

const unknownEndPoint = (request, response) => {
  return response.status(404).json(
    {
      error: 'Unknown endpoint'
    }
  ) 
}

const requestLogger = process.env.ENV === 'production' ? 
  morgan('combined') : 
  morgan('dev')

module.exports = {
  unknownEndPoint,
  requestLogger
}
