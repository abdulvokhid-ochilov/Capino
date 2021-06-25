const outputDB = require('./../modules/outputDB');


const getDate = function () {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

exports.todayDB = async (req, res) => {
    const db = await outputDB.find({
        date: {
            $gte: getDate()
        }
    }).exec();
    res.render("output/outputdb", { collections: db });
};
exports.getDB = async (req, res) => {
    try {
        let start = req.body.from ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`)) : from = new Date('May 29, 2021 00:00:00');
        // let end = req.body.to ? new Date(Date.now()) : new Date(Date.parse(`${today.getFullYear(), today.getMonth(), today.getDate()} 23:59:59 GMT`));
        const clientName = req.body.name || /\w*/gi;
        const phoneNo = req.body.phoneNo || /\w*/gi;
        const carNo = req.body.carNo || /\w*/gi;
        if (req.body.search === "search") {
            const db = await outputDB.find({
                date: {
                    $gte: start,
                    // $lte: end
                },
                _name: clientName,
                _phoneNo: phoneNo,
                _carNo: carNo
            }).exec();
            res.render("output/outputdb", { collections: db });
        }
    } catch (err) {
        console.log(err);
    }


};