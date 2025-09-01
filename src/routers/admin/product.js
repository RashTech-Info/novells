const express = require("express");
const router = express.Router();
const {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProductByName,
  getProductByCategory,
} = require("../../controllers/admin/product");
const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/gallery");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// Add Product (single + multiple images)
router.post(
  "/addProduct",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productGalleryImage", maxCount: 4 },
  ]),
  addProduct
);

// Get All Products
router.get("/getAllProducts", getAllProducts);

// Get product by category
router.get("/getProductByCategory/:category", getProductByCategory);

// Get By Name
router.get("/getProductByName/:name", getProductByName);

// Update
router.patch(
  "/updateProduct/:id",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productGalleryImage", maxCount: 4 },
  ]),
  updateProduct
);

// Delete
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
