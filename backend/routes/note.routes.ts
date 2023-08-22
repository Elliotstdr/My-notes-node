const nExpress = require("express");
const nRouter = nExpress.Router();
const {
  postNote,
  getAllNotes,
  getOneNote,
  putNote,
  deleteNote,
  postNoteOrder
} = require("../controllers/note.controller.ts");
const nAuth = require("../middleware/auth.ts");

nRouter.get("/", nAuth, getAllNotes);
nRouter.get("/:id", nAuth, getOneNote);
nRouter.post("/", nAuth, postNote);
nRouter.put("/:id", nAuth, putNote);
nRouter.delete("/:id", nAuth, deleteNote);
nRouter.post("/reorder", nAuth, postNoteOrder);

module.exports = nRouter;
