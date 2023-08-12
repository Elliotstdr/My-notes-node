export {};
const express = require("express");
const router = express.Router();
const {
  postNote,
  getAllNotes,
  getOneNote,
  putNote,
  deleteNote,
  postNoteOrder
} = require("../controllers/note.controller");
const auth = require("../middleware/auth");

router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/", postNote);
router.put("/:id", putNote);
router.delete("/:id", deleteNote);
router.post("/reorder", postNoteOrder);

module.exports = router;
