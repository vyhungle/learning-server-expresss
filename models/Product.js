const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["M", "L", "XL"],
  },
  quantity: {
    type: String,
  },
  descriptions: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("products", ProductSchema);
