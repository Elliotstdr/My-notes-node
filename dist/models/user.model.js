"use strict";
const uMongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = uMongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
module.exports = uMongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map