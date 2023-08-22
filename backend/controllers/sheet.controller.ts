const sheetModel = require("../models/sheet.model.ts");
const noteModel = require("../models/note.model.ts")

// Façon openClassroom
module.exports.getAllSheets = async (req: any, res: any) => {
  await sheetModel
    .find().populate("page")
    .then((things: Array<Sheet>) => res.status(200).json(things))
    .catch((error: any) => res.status(400).json({ error }));
};

module.exports.getOneSheet = async (req: any, res: any) => {
  await sheetModel
    .findOne({ _id: req.params.id }).populate("page")
    .then((thing: Sheet) => res.status(200).json(thing))
    .catch((error: any) => res.status(404).json({ error }));
};

module.exports.postSheet = async (req: any, res: any) => {
  delete req.body._id;
  const orderedSheets = await sheetModel.find({page: req.body.page._id}).sort({order: -1})
  const thing = new sheetModel({
    ...req.body,
    order: orderedSheets.length === 0 ? 0 : orderedSheets[0].order + 1
  });
  try {
    await thing.save();
    await thing.populate('page');
    res.status(201).json({ sheet: thing });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.putSheet = async (req: any, res: any) => {
  const sheet = await sheetModel.findById(req.params.id);

  if (!sheet) {
    res.status.json({ message: "Cette feuille n'existe pas" });
  }

  try {
    const updateSheet: any = await sheetModel.findByIdAndUpdate(sheet, req.body, { new: true })
    updateSheet.populate('page')
    res.status(200).json({sheet: updateSheet})
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.deleteSheet = async (req: any, res: any) => {
  const sheetId = req.params.id

  await sheetModel
    .findOne({ _id: sheetId })
    .then(() => {
        sheetModel
          .deleteOne({ _id: sheetId })
          .then(async () => {
            try {
              await noteModel.deleteMany({ sheet: sheetId });
            } catch (error) {
              res.status(400).json({ error });
            }
            res.status(200).json({ message: "Objet supprimé !" })
          })
          .catch((error: any) => res.status(400).json({ error }));
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};

module.exports.postSheetOrder = async (req: any, res: any) => {
  try {
    const updates = req.body;
    const updatePromises = updates.map((update: Sheet) => {
      return sheetModel.findByIdAndUpdate(update._id, update, { new: true }).populate('page');
    });
    const updatedSheets = await Promise.all(updatePromises);

    res.status(200).json({sheets: updatedSheets})
  } catch (error) {
    res.status(400).json({ error });
  }
};