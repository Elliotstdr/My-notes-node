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

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getOneNote);
router.post("/", auth, postNote);
router.put("/:id", auth, putNote);
router.delete("/:id", auth, deleteNote);
router.post("/reorder", auth, postNoteOrder);

module.exports = router;
