export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = mongoose.Schema(
  {
    label: { type: String, required: true },
    content: { type: String },
    sheet: { type: Schema.Types.ObjectId, ref: 'sheet', required: true },
    order: { type: Number},
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("note", noteSchema);
