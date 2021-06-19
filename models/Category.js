const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = model("categories", CategorySchema);
