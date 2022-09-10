
const Joi = require('@hapi/joi');

export const schemaRegister = Joi.object({
    first_name: Joi.string().required(),
    second_name: Joi.string().required(),
    username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
