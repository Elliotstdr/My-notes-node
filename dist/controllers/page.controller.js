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
const PageModel = require("../models/page.model");
const SheetModel = require("../models/sheet.model");
const pNoteModel = require("../models/note.model");
// Façon openClassroom
module.exports.getAllPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PageModel
        .find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
});
module.exports.getOnePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PageModel
        .findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});
module.exports.postPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    const orderedPages = yield PageModel.find().sort({ order: -1 });
    const thing = new PageModel(Object.assign(Object.assign({}, req.body), { order: orderedPages.length === 0 ? 0 : orderedPages[0].order + 1 }));
    yield thing
        .save()
        .then((thing) => res.status(201).json({ page: thing }))
        .catch((error) => res.status(400).json({ error }));
});
module.exports.putPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield PageModel.findById(req.params.id);
    if (!page) {
        res.status.json({ message: "Cette page n'existe pas" });
    }
    try {
        const updatePage = yield PageModel.findByIdAndUpdate(page, req.body, { new: true });
        res.status(200).json({ page: updatePage });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
module.exports.deletePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageId = req.params.id;
    yield PageModel
        .findOne({ _id: pageId })
        .then(() => {
        PageModel
            .deleteOne({ _id: pageId })
            .then(() => {
            try {
                deleteChildren(pageId);
            }
            catch (error) {
                res.status(400).json({ error });
            }
            res.status(200).json({ message: "Objet supprimé !" });
        })
            .catch((error) => res.status(400).json({ error }));
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
});
module.exports.postPageOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const updatePromises = updates.map((update) => {
            return PageModel.findByIdAndUpdate(update._id, update, { new: true });
        });
        const updatedPages = yield Promise.all(updatePromises);
        res.status(200).json({ pages: updatedPages });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const deleteChildren = (pageId) => __awaiter(void 0, void 0, void 0, function* () {
    yield SheetModel.deleteMany({ page: pageId });
    // Trouvez toutes les entités Note liées aux Sheets supprimées
    const sheets = yield SheetModel.find({ page: pageId }, '_id');
    const sheetIds = sheets.map((sheet) => sheet._id);
    // Supprimez toutes les entités Note liées aux Sheets supprimées
    yield pNoteModel.deleteMany({ sheet: { $in: sheetIds } });
});
//# sourceMappingURL=page.controller.js.map