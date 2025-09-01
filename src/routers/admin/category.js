const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../../controllers/admin/category");
const auth = require("../../../auth/adminauth");

// category -------------
router.post("/addCategory",  addCategory);
router.put("/updateCategory/:id",  updateCategory);
router.delete("/deleteCategory/:id",  deleteCategory);
router.get("/getAllCategory", getAllCategories);
module.exports = router;
