const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  borderColor: {
    type: String,
  },
});

module.exports = model("categories", CategorySchema);
