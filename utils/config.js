require('dotenv').config()

const PORT = process.env.PORT | 3001
const ENV = process.env.ENV || 'production'


module.exports = {
  PORT,
  ENV
}
