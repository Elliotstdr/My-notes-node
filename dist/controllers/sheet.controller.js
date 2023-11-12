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
const sheetModel = require("../models/sheet.model");
const noteModel = require("../models/note.model");
// Façon openClassroom
module.exports.getAllSheets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sheetModel
        .find().populate("page")
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
});
module.exports.getOneSheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sheetModel
        .findOne({ _id: req.params.id }).populate("page")
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});
module.exports.postSheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    const orderedSheets = yield sheetModel.find({ page: req.body.page._id }).sort({ order: -1 });
    const thing = new sheetModel(Object.assign(Object.assign({}, req.body), { order: orderedSheets.length === 0 ? 0 : orderedSheets[0].order + 1 }));
    try {
        yield thing.save();
        yield thing.populate('page');
        res.status(201).json({ sheet: thing });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
module.exports.putSheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = yield sheetModel.findById(req.params.id);
    if (!sheet) {
        res.status.json({ message: "Cette feuille n'existe pas" });
    }
    try {
        const updateSheet = yield sheetModel.findByIdAndUpdate(sheet, req.body, { new: true });
        updateSheet.populate('page');
        res.status(200).json({ sheet: updateSheet });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
module.exports.deleteSheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheetId = req.params.id;
    yield sheetModel
        .findOne({ _id: sheetId })
        .then(() => {
        sheetModel
            .deleteOne({ _id: sheetId })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield noteModel.deleteMany({ sheet: sheetId });
            }
            catch (error) {
                res.status(400).json({ error });
            }
            res.status(200).json({ message: "Objet supprimé !" });
        }))
            .catch((error) => res.status(400).json({ error }));
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
});
module.exports.postSheetOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const updatePromises = updates.map((update) => {
            return sheetModel.findByIdAndUpdate(update.id, update, { new: true }).populate('page');
        });
        const updatedSheets = yield Promise.all(updatePromises);
        res.status(200).json({ sheets: updatedSheets });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//# sourceMappingURL=sheet.controller.js.map