export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sheetSchema = mongoose.Schema(
  {
    label: { type: String, required: true },
    page: { type: Schema.Types.ObjectId, ref: 'page', required: true },
    order: { type: Number},
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("sheet", sheetSchema);
