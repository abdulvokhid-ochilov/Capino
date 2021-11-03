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

// output_history router
const outputHistoryRouter = require('./routes/outputHistoryRouter');
app.use("/api/v1/output_history", outputHistoryRouter)

//input router
// const inputRouter = require("./routes/input");
// app.use("/input", inputRouter);



module.exports = app;