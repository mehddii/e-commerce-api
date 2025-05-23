require('dotenv').config()

const PORT = process.env.PORT | 3001
const ENV = process.env.ENV || 'production'
const MONGODB_URI = process.env.MONGODB_URI


module.exports = {
  PORT,
  ENV,
  MONGODB_URI
}
