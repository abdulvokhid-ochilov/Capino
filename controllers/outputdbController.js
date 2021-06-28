const outputDB = require('./../modules/outputDB');

const today = new Date();
const getDate = function () {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

exports.getTodayDB = async (req, res) => {
    try {
        let db = await outputDB.find({
            date: {
                $gte: getDate()
            }
        }).exec();
        db = db.sort((a, b) => {
            return b.date - a.date;
        });
        res.render("output/outputdb", { collections: db });
    } catch (err) {
        console.log(`output db ${err}`);
    }

};
exports.getDB = async (req, res) => {
    try {
        let start = req.body.from ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`)) : new Date('May 29, 2021 00:00:00');

        let end = req.body.to ? new Date(Date.parse(`${req.body.to} 23:59:59 GMT`)) : new Date(`${today.getMonth() + 1}, ${today.getDate()}, ${today.getFullYear()} 23:59:59 GMT`);
        const clientName = req.body.name || /\w*/gi;
        const phoneNo = req.body.phoneNo || /\w*/gi;
        const carNo = req.body.carNo || /\w*/gi;
        if (req.body.search === "search") {
            let db = await outputDB.find({
                date: {
                    $gte: start,
                    $lte: end
                },
                _name: clientName,
                _phoneNo: phoneNo,
                _carNo: carNo
            }).exec();
            db = db.sort((a, b) => {
                return a.date - b.date;
            });
            res.render("output/outputdb", { collections: db });
        }
    } catch (err) {
        console.log(err);
    }


};