"use strict";
const uExpress = require("express");
const { login } = require("../controllers/user.controller");
const uRouter = uExpress.Router();
// uRouter.post("/signup", signUp);
uRouter.post("/login", login);
module.exports = uRouter;
//# sourceMappingURL=user.routes.js.map