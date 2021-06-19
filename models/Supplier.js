const { model, Schema } = require("mongoose");

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = model("suppliers", supplierSchema);
