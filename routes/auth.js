const { User, validateLogin } = require('../models/user')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const generateToken = ({ _id, email }) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      _id,
      email
    },
    config.get('jwtPrivateKey')
  )
}

router.post('/', async (req, res) => {
  try {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, password } = req.body

    let user = await User.findOne({ email }).limit(1).select({ email: 1, _id: 1, password: 1 })

    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = generateToken(user)

    res.send(token)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

module.exports = router
