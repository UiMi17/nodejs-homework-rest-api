const express = require("express");

const authController = require("../../controllers/auth-controller");

const { validateBody } = require("../../decorators");

const { isBodyEmpty } = require("../../middlewares");

const userSchemas = require("../../schemes/user-schemes");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isBodyEmpty,
  validateBody(userSchemas.userSignupScheme),
  authController.signup
);
authRouter.post(
  "/signin",
  isBodyEmpty,
  validateBody(userSchemas.userSigninScheme),
  authController.signin
);

module.exports = authRouter;
