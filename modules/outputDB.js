const mongoose = require("mongoose");
const outputSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    _name: String,
    _carNo: String,
    _phoneNo: String,
    _company: String,
    _client: Array,
    _BL: Array,
    _quantity: Array
});
module.exports = mongoose.model('Output', outputSchema);
