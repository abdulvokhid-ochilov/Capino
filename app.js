const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// output router
const outputRouter = require("./routes/outputRouter");
app.use("/api/v1/output", outputRouter);


//input router
// const inputRouter = require("./routes/input");
// app.use("/input", inputRouter);

// QR router
// const qrRouter = require("./routes/QR");
// app.use("/QR", qrRouter);

//Guide 
// const guideRouter = require('./routes/guide');
// app.use('/guide', guideRouter);



module.exports = app;