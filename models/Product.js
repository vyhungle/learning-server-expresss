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
  discount: {
    type: String,
    default: "0",
  },
  quantity: {
    type: String,
    required: true,
  },
  quantitySold: {
    type: String,
    default: "0",
  },
  evaluate: {
    star: String,
    body: String,
  },
  configuration: {
    screen: {
      type: String,
      required: true,
    },
    operatingSystem: {
      type: String,
      required: true,
    },
    behindCamera: {
      type: String,
      required: true,
    },
    frontCamera: {
      type: String,
      required: true,
    },
    chip: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      enum: ["1", "2", "3", "4", "6", "8", "12"],
      required: true,
    },
    rom: {
      type: String,
      enum: ["8", "16", "32", "64", "128", "256", "512"],
      required: true,
    },
    sim: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  descriptions: {
    type: String,
  },
  producer: {
    type: Schema.Types.ObjectId,
    ref: "producers",
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "suppliers",
  },
  guarantee: {
    type: String,
    default: "Không bảo hành",
  },
  typeOfPhone: {
    type: String,
    enum: ["Ios", "Android", "Khác"],
    default: "Ios",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("products", ProductSchema);
