const mongoose = require("mongoose");
const inputSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    _name: String,
    _phoneNo: String,
    _carNO: String,
    _company: String,
    _forwarder: String,
    _bookingNo: String,
    _signature: String,
    _destinationPort: String,
    _shiper: String,
    _departureDate: String,
    _cargo: Array,
    _packaging: Array,
    _quantity: Array,
    _volume: Array,
    _weight: Array
});
module.exports = mongoose.model('Input', inputSchema);