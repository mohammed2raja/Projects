const Joi = require('@hapi/joi')

// Registered validation
const registerValidation = (data) => {
  // Let validate the data
  // const {error} = await schema.validate(req.body)
  // if(error) return res.status(400).send(error.details[0].message)

  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

// Registered validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation