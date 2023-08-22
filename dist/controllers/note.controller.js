"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const NoteModel = require("../models/note.model");
// Façon openClassroom
module.exports.getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield NoteModel
        .find().populate("sheet")
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
});
module.exports.getOneNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield NoteModel
        .findOne({ _id: req.params.id }).populate("sheet")
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});
module.exports.postNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    const orderedNotes = yield NoteModel.find({ sheet: req.body.sheet._id }).sort({ order: -1 });
    const thing = new NoteModel(Object.assign(Object.assign({}, req.body), { order: orderedNotes.length === 0 ? 0 : orderedNotes[0].order + 1 }));
    try {
        yield thing.save();
        yield thing.populate('sheet');
        res.status(201).json({ note: thing });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
module.exports.putNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield NoteModel.findById(req.params.id);
    if (!note) {
        res.status.json({ message: "Cette note n'existe pas" });
    }
    try {
        const updateNote = yield NoteModel.findByIdAndUpdate(note, req.body, { new: true });
        yield updateNote.populate("sheet");
        res.status(200).json({ note: updateNote });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
module.exports.deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield NoteModel
        .findOne({ _id: req.params.id })
        .then(() => {
        NoteModel
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
});
module.exports.postNoteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const updatePromises = updates.map((update) => {
            return NoteModel.findByIdAndUpdate(update._id, update, { new: true }).populate('sheet');
        });
        const updatedNotes = yield Promise.all(updatePromises);
        res.status(200).json({ notes: updatedNotes });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//# sourceMappingURL=note.controller.js.map