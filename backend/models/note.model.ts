const nMongoose = require("mongoose");

const noteSchema = nMongoose.Schema(
  {
    label: { type: String, required: true },
    content: { type: String },
    sheet: { type: nMongoose.Schema.Types.ObjectId, ref: 'sheet', required: true },
    order: { type: Number},
  },
  {
    versionKey: false,
  }
);

module.exports = nMongoose.model("note", noteSchema);
