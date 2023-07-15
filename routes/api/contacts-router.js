const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const { validateBody } = require("../../decorators");
const schemes = require("../../schemes/contacts-schemes");
const { isValidId, isBodyEmpty } = require("../../middlewares");

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post(
  "/",
  validateBody(schemes.contactAddScheme),
  contactsController.add
);

router.delete("/:contactId", isValidId, contactsController.removeById);

router.put(
  "/:contactId",
  isValidId,
  isBodyEmpty,
  validateBody(schemes.contactAddScheme),
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemes.contactUpdateFavoriteScheme),
  contactsController.updateStatusContact
);

module.exports = router;
