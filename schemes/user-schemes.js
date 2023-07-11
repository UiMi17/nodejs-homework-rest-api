const Joi = require("joi");

const userSignupScheme = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const userSigninScheme = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  userSigninScheme,
  userSignupScheme,
};
