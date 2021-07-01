const { model, Schema } = require("mongoose");

const BillSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  address: String,
  phoneNumber: String,
  fullName: String,
  status: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("bills", BillSchema);
