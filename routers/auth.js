const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const {
  ValidateRegisterInput,
  ValidateLoginInput,
  ValidateProfile,
} = require("../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "14d" }
  );
}
// @route GET api/auth/user
// @desc get user
// @access Private
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Lấy dữ liệu thất bại",
      error,
    });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;
  const user = await User.findOne({ username: username });
  const usernameData = user ? user.username : "";
  const { valid, errors } = ValidateRegisterInput(
    usernameData,
    username,
    password,
    email,
    confirmPassword
  );
  if (!valid) {
    res.json({
      success: false,
      message: "Đăng ký thất bại",
      errors: errors,
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    const value = await newUser.save();
    const token = generateToken(value);
    res.json({
      success: true,
      message: "Đăng ký thành công",
      token: token,
    });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const { valid, errors } = ValidateLoginInput(username, password);
  if (!user) {
    if (username !== "") {
      errors.username = "Thông tin tài khoản không tồn tại";
    }
    res.json({
      success: false,
      message: "Đăng nhập thất bại",
      errors: errors,
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      if (password !== "") {
        errors.password = "Thông tin mật khẩu chưa chính xác";
      }
      res.json({
        success: false,
        message: "Đăng nhập thất bại",
        errors: errors,
      });
    } else {
      const token = generateToken(user);
      res.json({
        success: true,
        message: "Đăng nhập thành công",
        token: token,
      });
    }
  }
});

// @route PUT api/auth/login
// @desc edit address
// @access private
router.put("/editProfile", verifyToken, async (req, res) => {
  const { address, phoneNumber, fullName } = req.body;
  const { valid, errors } = ValidateProfile(address, phoneNumber, fullName);

  if (!valid) {
    return res.json({
      success: false,
      message: "Edit thất bại",
      errors: errors,
    });
  }

  await User.findById({ _id: req.userId }, function (err, doc) {
    if (err) {
      return res.json({
        success: false,
        message: err,
      });
    }
    doc.address = address;
    doc.phoneNumber = phoneNumber;
    doc.fullName = fullName;
    doc.save();
    return res.json({
      success: true,
      message: "Thay doi dia chi thanh cong",
      user: doc,
    });
  });
});

module.exports = router;
