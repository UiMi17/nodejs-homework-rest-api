const express = require("express");

const usersController = require("../../controllers/users-controller");

const { validateBody } = require("../../decorators");

const { isBodyEmpty, authenticate, upload } = require("../../middlewares");

const userSchemas = require("../../schemes/user-schemes");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isBodyEmpty,
  validateBody(userSchemas.userSignupScheme),
  usersController.signup
);
usersRouter.post(
  "/login",
  isBodyEmpty,
  validateBody(userSchemas.userSigninScheme),
  usersController.signin
);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  usersController.avatars
);

module.exports = usersRouter;
