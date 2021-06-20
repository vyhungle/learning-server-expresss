const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

// @route GET api/category/all
// @desc get category
// @access Public
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.json({
        success: false,
        message: "Lấy categories Thất bại",
      });
    }
    return res.json({
      success: true,
      message: "Lấy categories thành công",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

module.exports = router;
