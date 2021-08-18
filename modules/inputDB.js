const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const inputSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  imgUrl: String,
  randomKey: String,
  name: String,
  contact: String,
  car_number: String,
  forwarder: String,
  bookingNo: String,
  signature: String,
  destinationPort: String,
  departureDate: String,
  shipper: Array,
  packaging: Array,
  quantity: Array,
  volume: Array,
  weight: Array,
});
module.exports = mongoose.model("Input", inputSchema);
