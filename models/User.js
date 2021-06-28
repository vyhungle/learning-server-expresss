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
  address: String,
  phoneNumber: String,
  fullName: String,
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = model("users", userSchema);
