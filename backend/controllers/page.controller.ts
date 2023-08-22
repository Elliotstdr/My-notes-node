export{}
const PageModel = require("../models/page.model.ts");
const SheetModel = require("../models/sheet.model.ts");
const NoteModel = require("../models/note.model.ts");

// Façon openClassroom
module.exports.getAllPages = async (req: any, res: any) => {
  await PageModel
    .find()
    .then((things: Array<Page>) => res.status(200).json(things))
    .catch((error: any) => res.status(400).json({ error }));
};

module.exports.getOnePage = async (req: any, res: any) => {
  await PageModel
    .findOne({ _id: req.params.id })
    .then((thing: Page) => res.status(200).json(thing))
    .catch((error: any) => res.status(404).json({ error }));
};

module.exports.postPage = async (req: any, res: any) => {
  delete req.body._id;
  const orderedPages = await PageModel.find().sort({order: -1})
  const thing = new PageModel({
    ...req.body,
    order: orderedPages.length === 0 ? 0 : orderedPages[0].order + 1
  });
  await thing
    .save()
    .then((thing: Page) => res.status(201).json({ page: thing }))
    .catch((error: any) => res.status(400).json({ error }));
};

module.exports.putPage = async (req: any, res: any) => {
  const page = await PageModel.findById(req.params.id);

  if (!page) {
    res.status.json({ message: "Cette page n'existe pas" });
  }

  try {
    const updatePage: Page = await PageModel.findByIdAndUpdate(page, req.body, { new: true })
    res.status(200).json({page: updatePage})
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.deletePage = async (req: any, res: any) => {
  const pageId = req.params.id

  await PageModel
    .findOne({ _id: pageId })
    .then(() => {
        PageModel
          .deleteOne({ _id: pageId })
          .then(() => {
            try {
              deleteChildren(pageId)
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

module.exports.postPageOrder = async (req: any, res: any) => {
  try {
    const updates = req.body;

    const updatePromises = updates.map((update: Page) => {
      return PageModel.findByIdAndUpdate(update._id, update, { new: true });
    });
    const updatedPages = await Promise.all(updatePromises);

    res.status(200).json({pages: updatedPages})
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteChildren = async (pageId: string) => {
  await SheetModel.deleteMany({ page: pageId });
  // Trouvez toutes les entités Note liées aux Sheets supprimées
  const sheets = await SheetModel.find({ page: pageId }, '_id');
  const sheetIds = sheets.map((sheet: Sheet) => sheet._id);
  // Supprimez toutes les entités Note liées aux Sheets supprimées
  await NoteModel.deleteMany({ sheet: { $in: sheetIds } });
}