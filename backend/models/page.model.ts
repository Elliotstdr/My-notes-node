export {};
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
  {
    label: { type: String, required: true },
    order: { type: Number },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("page", pageSchema);
