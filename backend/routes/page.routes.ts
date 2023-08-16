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

router.get("/", auth, getAllPages);
router.get("/:id", auth, getOnePage);
router.post("/", auth, postPage);
router.put("/:id", auth, putPage);
router.delete("/:id", auth, deletePage);
router.post("/reorder", auth, postPageOrder);

module.exports = router;
