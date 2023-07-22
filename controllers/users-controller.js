const User = require("../models/contacts/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const jimp = require("jimp");
const path = require("path");

const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatar = gravatar.url(email, { s: "200" });

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    avatarURL: avatar,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id, subscription } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    subscription,
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const avatars = async (req, res) => {
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarDir, filename);
  await fs.rename(oldPath, newPath);

  const jimpImg = await jimp.read(newPath);
  await jimpImg.resize(250, 250).write(newPath);

  const avatarURL = path.join("avatars", filename);

  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    message: avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  avatars: ctrlWrapper(avatars),
};
