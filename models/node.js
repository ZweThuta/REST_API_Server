const { model, Schema } = require("mongoose");
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
    },
    creator: {
      type: String,
      default: "John Doe",
    },
  },
  {
    timestamps: true,
  }
);
const nodeModel = model("Note", noteSchema);
module.exports = nodeModel;
