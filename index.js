const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const erro = require('./middleware/erro')
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/user')
const auth = require('./routes/auth')
const express = require('express')
const app = express()
const config = require('config')

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERRO: jwtPrivateKey is not defined')
  process.exit(1)
}

mongoose.set('debug', true)

mongoose
  .connect('mongodb://root:example@localhost:27017/vidly?authSource=admin', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to mongo...')
  })
  .catch((err) => console.error(`err=> ${err}`))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(erro)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
