if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const qr = require("qrcode");
const app = express();



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




//mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });








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

// get.get("/input", (req, res) => {
//     res.render("input/input");
// });

// get.post("/input", (req, res) => {
//     const data = req.body;
//     if (req.body.qr === "qr") {
//         jsonData = JSON.stringify(data);
//         qr.toDataURL(jsonData, (err, url) => {

//             if (err) {
//                 res.send("Error occured");
//             } else {

//                 res.render("QR", { url });
//             }
//         });
//     }
// });



// //login
// const loginRouter = require("./routes/login");
// app.use("/", loginRouter);

// //main
// app.get("/main", (req, res) => {
//     res.render("main");
// });









// let jsonData = "";
// const currentDate = date.getDate();
// //output
// app.get("/output", (req, res) => {
//     res.render("output");
// });
// app.post("/output", (req, res) => {
//     const data = req.body;
//     if (data.sbm === "save") {
//         const output = new OutputDB({
//             date: currentDate,
//             name: data.성함,
//             carNo: data.차랑번호,
//             phoneNo: data.연락처,
//             company: data.소속회사,
//             client: data.화주명,
//             BL: data.비엘,
//             quantity: data.출고수량
//         });
//         output.save();
//         res.redirect("output");
//     }
//     if (data.sbm === "qr") {
//         jsonData = JSON.stringify(data);
//         qr.toDataURL(jsonData, (err, url) => {
//             if (err) {
//                 res.send("Error occured");
//             } else {
//                 res.render("QR", { url });
//             }
//         });
//     }
// });

// app.get("/outputdb", (req, res) => {
//     res.render("outputdb", { data: OutputDB.find() });
// });
// // OutputDB.find({ date: currentDate }, (err, success) => {
// //     if (err) {
// //         console.log("err");
// //     } else {
// //         console.log(success);
// //     }
// // });


// // input
// app.get("/input", (req, res) => {
//     res.render("input");
// });

// app.post("/input", (req, res) => {
//     const data = req.body;
//     if (req.body.qr === "qr") {
//         jsonData = JSON.stringify(data);
//         qr.toDataURL(jsonData, (err, url) => {

//             if (err) {
//                 res.send("Error occured");
//             } else {

//                 res.render("QR", { url });
//             }
//         });
//     }
// });



// // cfs
// app.get("/CFS", (req, res) => {
//     res.render("CFS");
// });

// // QR
// app.post("/QR", (req, res) => {
//     const phone = req.body.phone;
//     const accountSid = 'AC99321e0fcd8ace4e5b3874c21a0013d1';
//     const authToken = 'e2a1771b46ef35e9936f5ff6a8a45e6b';
//     const client = require('twilio')(accountSid, authToken);
//     client.messages.create({
//         body: `${jsonData}`,
//         to: `${phone}`,
//         from: '+19048779861'
//     }).then(message => res.send(`${alert("success!")}`));
// });









app.listen(process.env.PORT || 3000, () => {
    console.log('the app is running on port 3000');
});