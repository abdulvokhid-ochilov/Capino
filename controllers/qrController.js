const path = require('path');
const fs = require('fs');
const { msg, config } = require('coolsms-node-sdk');
config.init({
    apiKey: 'NCSCH0HI34MWQBIP',
    apiSecret: 'DILRAMBB9IT7CJIGYCETLSUKNBYNHY7Q'
});


/**
 * MMS 발송 (최대 1만건 동시 발송)
 */

const send = async function (phone, title, imgPath) {

    // 이미지 업로드
    try {

        const { fileId } = await msg.uploadMMSImage(path.join(__dirname, `${imgPath}.jpeg`));

        // // MMS 발송
        // // 01039197502
        // try {
        const result = await msg.send({
            messages: [
                {
                    to: `${phone}`,
                    from: '01087128235',
                    subject: 'MMS 제목',
                    imageId: fileId,
                    text: `${title}\nnumber:${imgPath}`
                }
            ]
        });
        if (result) {
            fs.unlinkSync(path.join(__dirname, `${imgPath}.jpeg`));
        }
    } catch (e) {
        console.log('statusCode:', e.statusCode);
        // console.log('errorCode:', e.error.errorCode);
        // console.log('errorMessage:', e.error.errorMessage);
    }
};


exports.postQR = async (req, res) => {
    try {
        send(req.body.phone, req.body.title, req.body.imgPath);
        res.redirect('/output');
    } catch (err) {
        res.send(err);
    }
};