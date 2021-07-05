const { model, Schema } = require("mongoose");

const FavoriteSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      createdAt: { type: String, default: new Date().toISOString() },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("favorites", FavoriteSchema);
