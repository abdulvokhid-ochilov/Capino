const express = require("express");
const bodyParser = require("body-parser");
const app = express();



app.set("view engine", "ejs");
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
app.use("/", mainRouter);





//output router
const outputRouter = require("./routes/output");
app.use("/", outputRouter);

const outputdbRouter = require("./routes/output");
app.use("/outputdb", outputdbRouter);



//input router
const inputRouter = require("./routes/input");
app.use("/", inputRouter);

const inputdbRouter = require("./routes/input");
app.use("/inputdb", inputdbRouter);




// QR router
const qrRouter = require("./routes/QR");
app.use("/", qrRouter);







let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
});

