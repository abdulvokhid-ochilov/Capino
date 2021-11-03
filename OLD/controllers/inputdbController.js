const inputDB = require("./../modules/inputDB");

const getDate = function () {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};
exports.getTodayDB = async (req, res) => {
  try {
    let db = await inputDB
      .find({
        date: {
          $gte: getDate(),
        },
      })
      .exec();
    db = db.sort((a, b) => {
      return b.date - a.date;
    });
    res.render("input/inputdb", { collections: db });
  } catch (err) {
    console.log(err);
  }
};

exports.getDB = async (req, res) => {
  const today = new Date();
  try {
    let start = req.body.from
      ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`))
      : new Date("May 29, 2021 00:00:00");

    let end = req.body.to
      ? new Date(Date.parse(`${req.body.to} 23:59:59 GMT`))
      : new Date(
        `${today.getMonth() + 1
        }, ${today.getDate()}, ${today.getFullYear()} 23:59:59 GMT`
      );

    const clientName = req.body.name || /\w*/gi;
    const phone_number = req.body.phone_number || /\w*/gi;
    const car_number = req.body.car_number || /\w*/gi;

    if (req.body.search === "search") {
      let db = await inputDB
        .find({
          date: {
            $gte: start,
            $lte: end,
          },
          name: clientName,
          contact: phone_number,
          car_number: car_number,
        })
        .exec();
      db = db.sort((a, b) => {
        return a.date - b.date;
      });
      res.render("input/inputdb", { collections: db });
    }
  } catch (err) {
    console.log(err);
  }
};
