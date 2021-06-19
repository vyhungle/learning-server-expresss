const { model, Schema } = require("mongoose");

const BillSchema = new Schema({
  products: [
    {
      productDetail: {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        number: {
          type: String,
          default: 1,
        },
      },
    },
  ],
  total: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("bills", BillSchema);
