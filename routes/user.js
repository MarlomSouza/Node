const { User, validateUser } = require('../models/user')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

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

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).select('-password').exec()
  if (!user) return res.status(404).send('User not found')
  res.send(user)
})

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, email, password, isAdmin } = req.body
    const hashedPassword = await cryptPassword(password)
    let user = new User({ name, email, password: hashedPassword, isAdmin })
    user = await user.save()
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const { id } = req.params

    await User.findByIdAndRemove(id).exec()

    res.send(204)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

module.exports = router
