require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const { msg, config } = require('coolsms-node-sdk');
config.init({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET
});



/**
 * MMS 발송 (최대 1만건 동시 발송)
 */

const send = async function () {

    // 이미지 업로드
    try {
        var { fileId } = await msg.uploadMMSImage(path.join(__dirname, 'qr.jpeg'));
        console.log(__dirname);
    } catch (e) {
        console.log('statusCode:', e.statusCode);
        console.log('errorCode:', e.error.errorCode);
        console.log('errorMessage:', e.error.errorMessage);
        return;
    }

    // MMS 발송
    // 01039197502
    try {
        const result = await msg.send({
            messages: [
                {
                    to: `01033721707`,
                    from: '01087128235',
                    subject: 'MMS 제목',
                    imageId: fileId,
                    text: 'hello '
                }
            ]
        });
        console.log('RESULT:');
    } catch (e) {
        console.log('statusCode:', e.statusCode);
        console.log('errorCode:', e.error.errorCode);
        console.log('errorMessage:', e.error.errorMessage);
    }
};




router.post("/QR", (req, res) => {
    // createImg();
    send();
    res.redirect("output");
});



module.exports = router;