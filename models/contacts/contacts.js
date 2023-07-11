const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

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
    avatarURL: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

movieSchema.post("save", handleMongooseError);

const Contact = model("contact", movieSchema);

module.exports = Contact;
