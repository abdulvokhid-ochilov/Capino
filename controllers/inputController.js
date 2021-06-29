const qr = require("qrcode");
const fs = require('fs');
const pngToJpeg = require('png-to-jpeg');
const inputDB = require("./../modules/inputDB");


//Generate random key
const randomKey = () => {
    const randomNum = Math.floor(Math.random() * 100 + 1);
    const now = Date.now();
    return `${randomNum}${now}`;
};

//create jpeg file
const convertToJpg = async function (url) {
    try {
        const imgPath = randomKey();
        const buffer = Buffer.from(url.split(/,\s*/)[1], 'base64');
        const qr = await pngToJpeg({ quality: 90 })(buffer);
        fs.writeFileSync(`${__dirname}/${imgPath}.jpeg`, qr);
        return imgPath;
    } catch (err) {
        console.error(err);
    }
};

/********CONTROLLERS********/
//get
exports.getInput = (req, res) => {
    res.status(200).render('input/input');
};
//post
exports.postInput = async (req, res) => {
    try {
        const data = req.body;

        const newInputDB = await inputDB.create({
            _name: data.성함,
            _phoneNo: data.연락처,
            _carNo: data.차량번호,
            _forwarder: data.포워더,
            _bookingNo: data.부킹넘버,
            _signature: data.황자,
            _destinationPort: data.도착항,
            _departureDate: data.출항일자,
            _cargo: data.화주명,
            _packaging: data.포장규격,
            _quantity: data.입고수량,
            _volume: data.용적,
            _weight: data.중량
        });
        const str = `name: ${data.성함}\ncarNo:${data.차량번호}\nphoneNo:${data.연락처}\nforwarder:${data.포워더} \nbookingNo:${data.부킹넘버}`;

        const url = await qr.toDataURL(str);

        const imgPath = await convertToJpg(url);
        if (req.body.sbm === "qr") {
            res.render("QR",
                {
                    url: url, title: "입고용청서", imgPath: imgPath
                });
        } else if (req.body.sbm === "print") {
            res.render("input/inputPrint",
                {
                    date: 0, data: data, url: url
                });
        } else {
            res.redirect('/input');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

