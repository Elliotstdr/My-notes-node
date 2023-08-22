const sExpress = require("express");
const sRouter = sExpress.Router();
const {
  postSheet,
  getAllSheets,
  getOneSheet,
  putSheet,
  deleteSheet,
  postSheetOrder
} = require("../controllers/sheet.controller.ts");
const sAuth = require("../middleware/auth.ts");

sRouter.get("/", sAuth, getAllSheets);
sRouter.get("/:id", sAuth, getOneSheet);
sRouter.post("/", sAuth, postSheet);
sRouter.put("/:id", sAuth, putSheet);
sRouter.delete("/:id", sAuth, deleteSheet);
sRouter.post("/reorder", sAuth, postSheetOrder);

module.exports = sRouter;
