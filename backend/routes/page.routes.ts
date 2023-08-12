export {};
const express = require("express");
const router = express.Router();
const {
  postPage,
  getAllPages,
  getOnePage,
  putPage,
  deletePage,
  postPageOrder
} = require("../controllers/page.controller");
const auth = require("../middleware/auth");

router.get("/", getAllPages);
router.get("/:id", getOnePage);
router.post("/", postPage);
router.put("/:id", putPage);
router.delete("/:id", deletePage);
router.post("/reorder", postPageOrder);

module.exports = router;
