const Joi = require('@hapi/joi')

//REGISTER VALIDATION
const registerValidation = (data) => {
  const schemaValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schemaValidation.validate(data)
}

// LOGIN VALIDATION
const loginValidation = (data) => {
  const schemaValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
