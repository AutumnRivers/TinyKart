const router = require('express').Router();
const upload = require('multer')();
const fs = require('fs');
const path = require('path');

router.use(upload.single('player_avatar[avatar]'));

router.post('/update.xml', (req, res) => {
    const avatar = req.file;

    if(!avatar) res.status(400);
    if(!avatar) res.send('Missing Avatar');

    fs.writeFile(path.join(__dirname + '../../../assets/players/debug.png'), avatar.buffer, 'binary', (err) => {
        if(!err) {
            console.log("Avatar updated successfully :)");
        } else {
            console.trace(err);
        }
    });

    res.status(200);
    res.sendFile(path.join(__dirname + '../../../success.xml'));
});

module.exports = router;