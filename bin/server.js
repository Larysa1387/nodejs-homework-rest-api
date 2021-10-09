const mongoose = require('mongoose')
require('dotenv').config()
require('colors')

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful'.black.bgGreen)
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log(err.message.black.bgRed)
    process.exit(1)
  })
