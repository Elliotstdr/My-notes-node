const NoteModel = require("../models/note.model");

// Façon openClassroom
module.exports.getAllNotes = async (req: any, res: any) => {
  await NoteModel
    .find().populate("sheet")
    .then((things: Array<Note>) => res.status(200).json(things))
    .catch((error: any) => res.status(400).json({ error }));
};

module.exports.getOneNote = async (req: any, res: any) => {
  await NoteModel
    .findOne({ _id: req.params.id }).populate("sheet")
    .then((thing: Note) => res.status(200).json(thing))
    .catch((error: any) => res.status(404).json({ error }));
};

module.exports.postNote = async (req: any, res: any) => {
  delete req.body._id;
  const orderedNotes = await NoteModel.find({sheet: req.body.sheet._id}).sort({order: -1})
  const thing = new NoteModel({
    ...req.body,
    order: orderedNotes.length === 0 ? 0 : orderedNotes[0].order + 1
  });
  try {
    await thing.save();
    await thing.populate('sheet');
    res.status(201).json({ note: thing });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.putNote = async (req: any, res: any) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status.json({ message: "Cette note n'existe pas" });
  }

  try {
    const updateNote: any = await NoteModel.findByIdAndUpdate(note, req.body, { new: true })
    await updateNote.populate("sheet")
    res.status(200).json({note: updateNote})
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.deleteNote = async (req: any, res: any) => {
  await NoteModel
    .findOne({ _id: req.params.id })
    .then(() => {
        NoteModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error: any) => res.status(400).json({ error }));
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};

module.exports.postNoteOrder = async (req: any, res: any) => {
  try {
    const updates = req.body;
    const updatePromises = updates.map((update: Note) => {
      return NoteModel.findByIdAndUpdate(update._id, update, { new: true }).populate('sheet');
    });
    const updatedNotes = await Promise.all(updatePromises);

    res.status(200).json({notes: updatedNotes})
  } catch (error) {
    res.status(400).json({ error });
  }
};