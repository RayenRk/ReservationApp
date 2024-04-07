const Joi = require('joi');

const schemaValidation = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const schemaRoom = Joi.object({
    name: Joi.string().required(),
    capacity: Joi.number().required(),
    equipment: Joi.array().items(Joi.string()).required(),
    availability: Joi.boolean().required(),
});

module.exports = {
    schemaValidation,
    schemaRoom,
    
};