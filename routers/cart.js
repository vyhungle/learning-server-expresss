const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart");
const User = require("../models/User");

// @route POST api/cart/addBill
// @desc add bill
// @access private
router.post("/addBill", verifyToken, async (req, res) => {
  const { products, total } = req.body;
  const user = await User.findById(req.userId);
  if (
    user.address === undefined ||
    user.fullName === undefined ||
    user.phoneNumber === undefined
  ) {
    return res.json({
      success: false,
      message: "Lỗi",
      error: "Vui lòng chọn địa chỉ nhận hàng",
    });
  }
  const bill = new Cart({
    products,
    total,
    address: user.address,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    user: req.userId,
  });
  bill.save();
  return res.json({
    success: true,
    message: "Tạo đơn hàng thành công",
    bill,
  });
});

module.exports = router;
