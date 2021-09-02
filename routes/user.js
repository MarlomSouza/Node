const { User, validateUser } = require('../models/user')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const auth = require('../middleware/auth')

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

router.get('/me', auth, async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-password')
  res.send(user)
})

router.get('/', auth, async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, email, password } = req.body
    const hashedPassword = await cryptPassword(password)
    let user = new User({ name, email, password: hashedPassword })
    user = await user.save()
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

module.exports = router
