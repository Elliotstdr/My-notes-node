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

router.get("/", auth, getAllSheets);
router.get("/:id", auth, getOneSheet);
router.post("/", auth, postSheet);
router.put("/:id", auth, putSheet);
router.delete("/:id", auth, deleteSheet);
router.post("/reorder", auth, postSheetOrder);

module.exports = router;
