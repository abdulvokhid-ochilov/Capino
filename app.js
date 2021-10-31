const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//login router
// const loginRouter = require("./routes/login");
// app.use("/", loginRouter);

//main router
// const mainRouter = require("./routes/main");
// app.use("/", mainRouter);

//output router
// const outputRouter = require("./routes/output");
// app.use("/output", outputRouter);


//input router
// const inputRouter = require("./routes/input");
// app.use("/input", inputRouter);

// QR router
// const qrRouter = require("./routes/QR");
// app.use("/QR", qrRouter);

//Guide 
// const guideRouter = require('./routes/guide');
// app.use('/guide', guideRouter);
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'success',
        data: {

        }
    })
})


module.exports = app;