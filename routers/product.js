const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Product = require("../models/Product");
const { ValidateProductInput } = require("../utils/validators");

// @route POST api/product/add
// @desc add product
// @access Private
router.post("/add", verifyToken, async (req, res) => {
  const { name, image, price, size, quantity, descriptions, userId } = req.body;
  const { valid, errors } = ValidateProductInput(name, image, price, quantity);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Thêm sản phẩm không thành công",
      errors: errors,
      product: null,
    });
  }
  try {
    const newProduct = new Product({
      name,
      image,
      price,
      size: size || "M",
      quantity,
      descriptions,
      user: userId,
    });
    await newProduct.save();
    return res.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      errors: null,
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }

  try {
  } catch (error) {}
});

// @route POST api/product/all
// @desc get product
// @access Public
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
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

module.exports = router;
