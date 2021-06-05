const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  ValidateRegisterInput,
  ValidateLoginInput,
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

router.get("/", (req, res) => {
  res.send("UserRouter");
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
    res
      .status(400)
      .json({
        success: false,
        message: "Đăng ký thất bại",
        errors: errors,
        token: null,
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
      errors: null,
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
      const err = {
        field: "username",
        message: "Thông tin tài khoản không tồn tại",
      };
      errors.push(err);
    }
    res.status(400).json({
      success: false,
      message:"Đăng nhập thất bại",
      errors: errors,
      token: null,
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      if (password !== "") {
        const err = {
          field: "password",
          message: "Thông tin mật khẩu chưa chính xác",
        };
        errors.push(err);
      }
      res.json({
        success: false,
        message:"Đăng nhập thất bại",
        errors: errors,
        token: null,
      });
    } else {
      const token = generateToken(user);
      res.json({
        success: true,
        message:"Đăng nhập thành công",
        errors: null,
        token: token,
      });
    }
  }
});

module.exports = router;
