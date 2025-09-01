const productModel = require("../../model/product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, features, skuCode, description } = req.body;

    const productData = {
      name,
      category,
      price,
      features: features ? features.split(",") : [],
      skuCode,
      description,
    };

    if (req.files["productImage"]) {
      productData.productImage = req.files["productImage"][0].filename;
    }

    if (req.files["productGalleryImage"]) {
      productData.productGalleryImage = req.files["productGalleryImage"].map(
        (file) => file.filename
      );
    }

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get Product by Category
exports.getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await productModel.find({ category });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get Product by Name
exports.getProductByName = async (req, res) => {
  try {
    const name  = req.params.name;
    const product = await productModel.findOne({ name });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.features) {
      updates.features = updates.features.split(",");
    }

    if (req.files["productImage"]) {
      updates.productImage = req.files["productImage"][0].filename;
    }

    if (req.files["productGalleryImage"]) {
      updates.productGalleryImage = req.files["productGalleryImage"].map(
        (file) => file.filename
      );
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
