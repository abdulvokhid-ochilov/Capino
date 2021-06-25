const inputDB = require("./../modules/inputDB");


const getDate = function () {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};
exports.getTodayDB = async (req, res) => {
    try {
        const db = await inputDB.find({
            date: {
                $gte: getDate()
            }
        }).exec();
        res.render("input/inputdb", { collections: db });
    } catch (err) {
        console.log(err);
    };
};

exports.getDB = async (req, res) => {
    const today = new Date();
    try {
        let start = req.body.from ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`)) : from = new Date('May 29, 2021 00:00:00');
        let end = req.body.to ? new Date(Date.now()) : new Date(Date.parse(`${today.getFullYear(), today.getMonth(), today.getDate()} 23:59:59 GMT`));
        const clientName = req.body.name || /\w*/gi;
        const phoneNo = req.body.phoneNo || /\w*/gi;
        const carNo = req.body.carNo || /\w*/gi;
        if (req.body.search === "search") {
            const db = await inputDB.find({
                date: {
                    $gte: start
                    // $lte: end
                },
                // _name: clientName,
                // _phoneNo: phoneNo,
                // _carNo: carNo
            }).exec();
            res.render("input/inputdb", { collections: db });
        }
    } catch (err) {
        console.log(err);
    }
};




