export {};
const express = require("express");
const router = express.Router();
const {
  postSheet,
  getAllSheets,
  getOneSheet,
  putSheet,
  deleteSheet,
  postSheetOrder
} = require("../controllers/sheet.controller");
const auth = require("../middleware/auth");

router.get("/", getAllSheets);
router.get("/:id", getOneSheet);
router.post("/", postSheet);
router.put("/:id", putSheet);
router.delete("/:id", deleteSheet);
router.post("/reorder", postSheetOrder);

module.exports = router;
