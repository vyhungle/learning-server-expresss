const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

module.exports = model("users", userSchema);
