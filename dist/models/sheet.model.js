"use strict";
const sMongoose = require("mongoose");
const sheetSchema = sMongoose.Schema({
    label: { type: String, required: true },
    page: { type: sMongoose.Schema.Types.ObjectId, ref: 'page', required: true },
    order: { type: Number },
}, {
    versionKey: false,
});
module.exports = sMongoose.model("sheet", sheetSchema);
//# sourceMappingURL=sheet.model.js.map