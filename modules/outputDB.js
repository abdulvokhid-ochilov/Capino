const mongoose = require("mongoose");
const outputSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    imgUrl: String,
    randomKey: String,
    성함: String,
    차량번호: String,
    연락처: String,
    전체수량: Array,
    화주명: Array,
    비엘: Array,
    출고수량: Array
});
module.exports = mongoose.model('Output', outputSchema);
