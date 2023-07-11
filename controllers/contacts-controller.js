const { ctrlWrapper } = require("../decorators");
const fs = require("fs/promises");
const path = require("path");

const Contact = require("../models/contacts/contacts");
const { HttpError } = require("../helpers");

const avatarsDir = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "email subscription"
  );
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);
  fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  const { _id: owner } = req.user;
  const contact = await Contact.create({
    ...req.body,
    avatarURL: avatar,
    owner,
  });
  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(400, "missing field favorite");
  }
  res.json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeById: ctrlWrapper(removeById),
};
