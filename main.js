const express = require("express");
const bodyParser = require("body-parser");
const qr = require("qrcode");
const app = express();


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//login
app.get("/", (req, res) => {
    res.render("login");
});
//main
app.get("/main", (req, res) => {
    res.render("main");
});

let jsonData = "";
//output
app.get("/output", (req, res) => {
    res.render("output");
});
app.post("/output", (req, res) => {
    const data = req.body;
    jsonData = JSON.stringify(data);
    qr.toDataURL(jsonData, (err, url) => {
        if (err) {
            res.send("Error occured");
        } else {
            res.render("QR", { url });
        }
    });
});
// input
app.get("/input", (req, res) => {
    res.render("input");
});

app.post("/input", (req, res) => {
    const data = req.body;
    jsonData = JSON.stringify(data);
    qr.toDataURL(jsonData, (err, url) => {

        if (err) {
            res.send("Error occured");
        } else {

            res.render("QR", { url });
        }
    });
});
// cfs
app.get("/CFS", (req, res) => {
    res.render("CFS");
});

// QR
app.post("/QR", (req, res) => {
    const phone = req.body.phone;
    const accountSid = 'AC99321e0fcd8ace4e5b3874c21a0013d1';
    const authToken = 'e2a1771b46ef35e9936f5ff6a8a45e6b';
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body: `${jsonData}`,
        to: `${phone}`,
        from: '+19048779861'
    }).then(message => res.send(`${alert("success!")}`));
});
app.listen(process.env.PORT || 3000, () => {
    console.log('the app is running on port 3000');
});