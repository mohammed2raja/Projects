const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation')

// REGISTER A USER
router.post('/register', async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // Check if user is already in the DB
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Email already exist in DB')

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(err)
  }
  console.log('Registered!')
})

// LOGIN
router.post('/login', async(req, res) => {
  // Validate user data
  const { error } = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // Check if user is already in the DB
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).send('User does not exist!')
  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid password')

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)

  res.send('Logged in!')
})


module.exports = router