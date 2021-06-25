const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();



app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-asliddin:AB17071998@@cluster0.yktos.mongodb.net/CapinoDB", { useNewUrlParser: true, useUnifiedTopology: true });






//login router
const loginRouter = require("./routes/login");
app.use("/", loginRouter);

//main router
const mainRouter = require("./routes/main");
app.use("/main", mainRouter);

//output router
const outputRouter = require("./routes/output");
app.use("/output", outputRouter);


//input router
const inputRouter = require("./routes/input");
app.use("/input", inputRouter);

// QR router
const qrRouter = require("./routes/QR");
app.use("/QR", qrRouter);


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
});

