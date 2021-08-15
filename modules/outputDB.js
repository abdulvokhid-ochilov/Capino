const mongoose = require("mongoose");
const outputSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  imgUrl: String,
  randomKey: String,
  name: String,
  car_number: String,
  contact: String,
  client: Array,
  bl_number: Array,
  quantity: Array,
  total_quantity: Array,
});
module.exports = mongoose.model("Output", outputSchema);
