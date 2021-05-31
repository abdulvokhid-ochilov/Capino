const express = require('express');
const router = express.Router();
router.post("/QR", (req, res) => {
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



module.exports = router;