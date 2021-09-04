const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const app = express()

require('./startup/logger')
require('./startup/config')()
require('./startup/db')()
require('./startup/routes')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
