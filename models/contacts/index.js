const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((contact) => {
    return contact.id === contactId;
  });

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  console.log(index);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);

  updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => {
    return contact.id === contactId;
  });

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  updateContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
