const { ctrlWrapper } = require("../decorators");

const contactsService = require("../models/contacts/index.js");
const { HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.removeContact(contactId);

  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const contact = await contactsService.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeById: ctrlWrapper(removeById),
};
