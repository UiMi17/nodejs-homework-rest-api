const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../middlewares");

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

movieSchema.post("save", handleMongooseError);

const Contact = model("contact", movieSchema);

module.exports = Contact;
