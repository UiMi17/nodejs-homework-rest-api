const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const { validateBody } = require("../../decorators");
const schemes = require("../../schemes/contacts");

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  validateBody(schemes.contactAddScheme),
  contactsController.add
);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);

module.exports = router;