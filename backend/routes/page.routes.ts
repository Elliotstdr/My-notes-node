const pExpress = require("express");
const pRouter = pExpress.Router();
const {
  postPage,
  getAllPages,
  getOnePage,
  putPage,
  deletePage,
  postPageOrder
} = require("../controllers/page.controller.ts");
const pAuth = require("../middleware/auth.ts");

pRouter.get("/", pAuth, getAllPages);
pRouter.get("/:id", pAuth, getOnePage);
pRouter.post("/", pAuth, postPage);
pRouter.put("/:id", pAuth, putPage);
pRouter.delete("/:id", pAuth, deletePage);
pRouter.post("/reorder", pAuth, postPageOrder);

module.exports = pRouter;
