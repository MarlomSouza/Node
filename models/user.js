const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  })
)

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
  })

  return schema.validate(user)
}

const validateLogin = (login) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
  })

  return schema.validate(login)
}

module.exports = {
  User,
  validateUser,
  validateLogin
}
