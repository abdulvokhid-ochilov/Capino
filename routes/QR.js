const express = require('express');
const router = express.Router();
const imageToBase64 = require('image-to-base64');


const path = require('path');
const { msg } = require('coolsms-node-sdk');
console.log(msg);


const send = async (number) => {
    // 이미지 업로드
    try {
        var { fileId } = await msg.uploadMMSImage(path.join(`${__dirname}/qr.png`));
    } catch (e) {
        console.log(number);
    }

    // MMS 발송
    try {

        const result = await msg.send({
            messages: [
                {
                    to: `${number}`,
                    from: '029302266',
                    subject: 'MMS 제목',
                    imageId: fileId,
                    text: '이미지 아이디가 입력되면 MMS로 발송됩니다.'
                }
            ]
        });
        // console.log('RESULT:', result);
    } catch (e) {
        console.log(e);
    }
};



router.post("/QR", (req, res) => {
    send(req.body.phone);
    res.redirect("output");
});



module.exports = router;