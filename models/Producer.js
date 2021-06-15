const { model, Schema } = require("mongoose");

const producerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = model("producers", producerSchema);
