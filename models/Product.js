const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, require: true },
  inventory: { type: Number },
  price: { type: Number, required: true },
  detail: { type: String },
  sellNumber: { type: Number, default: 0 },
  createdAt: { type: String, default: new Date().toISOString() },
  discount: { type: Number, default: 0 },
  review: {
    star: { type: Number, default: 5 },
    contents: [
      {
        body: { type: String },
        star: { type: Number, default: 5 },
        createdAt: { type: String, default: new Date().toISOString() },
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
  },
  star: { type: Number },

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
