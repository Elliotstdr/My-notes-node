"use strict";
const pMongoose = require("mongoose");
const pageSchema = pMongoose.Schema({
    label: { type: String, required: true },
    order: { type: Number },
}, {
    versionKey: false,
});
module.exports = pMongoose.model("page", pageSchema);
//# sourceMappingURL=page.model.js.map