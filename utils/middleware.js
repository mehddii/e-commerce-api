const ENV = require('./config').ENV
const morgan = require('morgan')

const unknownEndPoint = (request, response) => {
  return response.status(404).json(
    {
      error: 'Unknown endpoint'
    }
  ) 
}

const requestLogger = ENV === 'production' ? 
  morgan('combined') : 
  morgan('dev')

module.exports = {
  unknownEndPoint,
  requestLogger
}
