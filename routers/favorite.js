const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const Product = require("../models/Product");
const Favorite = require("../models/Favorite");

// @route GET api/favorite/my
// @desc get my favorite
// @access Private
router.get("/my", verifyToken, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ user: req.userId }).populate(
      "products.product"
    );
    return res.json({
      success: true,
      message: "get favorite thanh cong",
      favorites: favorite,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "get favorite that bai",
      error: error,
    });
  }
});

// @route Put api/favorite/like:id
// @desc like or dislike product
// @access Private
router.put("/like/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    var favorite = await Favorite.findOne({ user: req.userId });

    if (favorite === null) {
      favorite = new Favorite({
        user: req.userId,
      });
    }

    const index = favorite.products.findIndex(
      (x) => x.product.toString() === product._id.toString()
    );

    if (index === -1) {
      favorite.products.push({
        product,
        createdAt: new Date().toISOString(),
      });
      res.json({
        success: true,
        message: "like thanh cong",
        like: true,
        response: {
          product,
          createdAt: new Date().toISOString(),
        },
      });
    } else {
      favorite.products.splice(index, 1);
      res.json({
        success: true,
        message: "dislike thanh cong",
        like: false,
        response: {
          index,
        },
      });
    }
    favorite.save();
  } catch (error) {
    res.json({
      success: false,
      message: "like or dislike that bai",
      error: error,
    });
  }
});

module.exports = router;
