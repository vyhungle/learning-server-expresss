const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
require("dotenv").config();

const verifyToken = require("../middleware/auth");
const Product = require("../models/Product");
const Producer = require("../models/Producer");
const Supplier = require("../models/Supplier");
const { ValidateProductInput } = require("../utils/validators");
const { remove } = require("../models/Product");

// Connect server image
cloudinary.config({
  cloud_name: "web-img-nectar",
  api_key: "135712658931463",
  api_secret: "Qj8-0NH3hSG00gXJ7tIIAKrFpNs",
});

// @route GET api/product/all
// @desc get product
// @access Public
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("user", ["username", "email", "createdAt"])
      .populate("supplier")
      .populate("producer");
    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Lấy sản phẩm thất bại",
      });
    }
    return res.json({
      success: true,
      message: "Lấy sản phẩm thành công",
      products: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// @route GET api/product:id
// @desc get product by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("user", ["username", "email", "createdAt"])
      .populate("supplier")
      .populate("producer");

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Lấy sản phẩm thất bại",
      });
    }
    return res.json({
      success: true,
      message: "Lấy sản phẩm thành công",
      product: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// @route POST api/product/add
// @desc add product
// @access Private
router.post("/add", verifyToken, async (req, res) => {
  const {
    name,
    image,
    price,
    quantity,
    descriptions,
    configuration,
    producerId,
    supplierId,
    guarantee,
    typeOfPhone,
  } = req.body;
  const { valid, errors } = ValidateProductInput(name, image, price, quantity);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Thêm sản phẩm không thành công",
      errors: errors,
    });
  }
  try {
    var uri = [];
    for (const img of image) {
      const result = await cloudinary.v2.uploader.upload(img, {
        allowed_formats: ["jpg", "png"],
        public_id: "",
        folder: "Products",
      });
      uri.push(result.url);
    }
    const newProduct = new Product({
      name,
      image: uri,
      price,
      quantity,
      descriptions,
      configuration,
      producer: producerId,
      supplier: supplierId,
      guarantee,
      typeOfPhone,
      user: req.userId,
    });
    await newProduct.save();
    return res.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }

  try {
  } catch (error) {}
});

// @route PUT api/product:id
// @desc Edit product by id
// @access Private
router.put("/update/:id", verifyToken, async (req, res) => {
  const { name, image, price, size, quantity, descriptions } = req.body;
  const { valid, errors } = ValidateProductInput(name, image, price, quantity);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Thêm sản phẩm không thành công",
      errors: errors,
    });
  }
  try {
    var uri = [];
    for (const img of image) {
      const result = await cloudinary.v2.uploader.upload(img, {
        allowed_formats: ["jpg", "png"],
        public_id: "",
        folder: "Products",
      });
      uri.push(result.url);
    }
    var updateProduct = {
      name,
      image: uri,
      price,
      size: size || "M",
      quantity,
      descriptions,
    };

    const productUpdateCondition = { _id: req.params.id, user: req.userId };

    updateProduct = await Product.findOneAndUpdate(
      productUpdateCondition,
      updateProduct,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy sản phẩm này",
      });
    }
    return res.json({
      success: true,
      message: "update sản phẩm thành công",
      product: updateProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// @route DELETE api/product:id
// @desc Delete product by id
// @access Private
router.delete("/delete/:id", verifyToken, async (req, res) => {
  const deleteProductCondition = { _id: req.params.id, user: req.userId };

  try {
    const deleteProduct = await Product.findOneAndDelete(
      deleteProductCondition
    );
    if (!deleteProduct) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy sản phẩm này",
      });
    }
    return res.json({
      success: true,
      message: "Xóa thành công",
      product: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

module.exports = router;
