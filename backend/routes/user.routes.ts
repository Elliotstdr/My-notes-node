const uExpress = require("express");
const { signUp, login } = require("../controllers/user.controller.ts");
const uRouter = uExpress.Router();

uRouter.post("/signup", signUp);
uRouter.post("/login", login);

module.exports = uRouter;
