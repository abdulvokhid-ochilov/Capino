const mongoose = require("mongoose");
const outputSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    carNo: String,
    phoneNo: String,
    company: String,
    client: Array,
    BL: Array,
    quantity: Array
});
module.exports = mongoose.model('Output', outputSchema);