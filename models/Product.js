const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  uint: { type: String, required: true },
  quantity: { type: Number, require: true },
  inventory: { type: Number },
  price: { type: Number, required: true },
  detail: { type: String },

  createdAt: { type: String, default: new Date().toISOString() },
  review: {
    start: { type: Number, default: 5 },
    body: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  start: { type: Number },

  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  producer: {
    type: Schema.Types.ObjectId,
    ref: "producers",
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "suppliers",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("products", ProductSchema);
