const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
require("dotenv").config();

const verifyToken = require("../middleware/auth");
const Product = require("../models/Product");
const Producer = require("../models/Producer");
const Supplier = require("../models/Supplier");
const Category = require("../models/Category");
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
    const products = await Product.find().populate("review.contents.user", [
      "username",
      "fullName",
      "email",
      "createdAt",
    ]);
    // .populate("supplier")
    // .populate("producer")
    // .populate("category");
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
    const product = await Product.findById(req.params.id);
    // .populate("user", ["username", "email", "createdAt"])
    // .populate("supplier")
    // .populate("producer")
    // .populate("category");

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
    unit,
    quantity,
    price,
    detail,
    discount,
    categoryId,
    producerId,
    supplierId,
  } = req.body;
  const { valid, errors } = ValidateProductInput(
    name,
    image,
    price,
    quantity,
    unit
  );
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Thêm sản phẩm không thành công",
      errors: errors,
    });
  }
  try {
    var uri = "";
    const result = await cloudinary.v2.uploader.upload(image, {
      allowed_formats: ["jpg", "png"],
      public_id: "",
      folder: "Products",
    });
    uri = result.url;

    const newProduct = new Product({
      name,
      image: uri,
      unit,
      quantity,
      price,
      detail,
      discount,
      category: categoryId,
      producer: producerId,
      supplier: supplierId,
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
  const {
    name,
    image,
    unit,
    quantity,
    price,
    detail,
    categoryId,
    producerId,
    supplierId,
    discount,
  } = req.body;
  const { valid, errors } = ValidateProductInput(
    name,
    image,
    price,
    quantity,
    uint
  );
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Thêm sản phẩm không thành công",
      errors: errors,
    });
  }
  try {
    var uri = "";
    const result = await cloudinary.v2.uploader.upload(image, {
      allowed_formats: ["jpg", "png"],
      public_id: "",
      folder: "Products",
    });
    uri = result.url;

    var updateProduct = {
      name,
      image: uri,
      uint,
      quantity,
      price,
      discount,
      detail,
      categoryId: categoryId,
      producer: producerId,
      supplier: supplierId,
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

// @route PUT api/review/product:id
// @desc review product by id
// @access Private
router.put("/review/:id", verifyToken, async (req, res) => {
  const { star, body } = req.body;
  const product = await Product.findById(req.params.id);
  let index = product.review.contents.findIndex(
    (x) => x.user.toString() === req.userId
  );
  if (index === -1) {
    product.review.star =
      (product.review.star * product.review.contents.length + star) /
      (product.review.contents.length + 1);
    product.review.contents.push({
      star,
      body,
      user: req.userId,
      createdAt: new Date().toISOString(),
    });
    product.save();
    return res.json({
      success: true,
      message: "Đánh giá thành công",
      response: {
        star: product.review.star,
        newContent: {
          star,
          body,
          user: req.userId,
          createdAt: new Date().toISOString(),
        },
      },
    });
  } else {
    product.review.star =
      (product.review.star * product.review.contents.length -
        product.review.contents[index].star +
        star) /
      product.review.contents.length;

    product.review.contents[index] = {
      star,
      body,
      user: req.userId,
    };

    product.save();
    return res.json({
      success: true,
      message: "Đánh giá thành công",
      review: product.review,
    });
  }
});

module.exports = router;
