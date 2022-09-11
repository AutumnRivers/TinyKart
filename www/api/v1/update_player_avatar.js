const router = require('express').Router();
const upload = require('multer')();
const fs = require('fs');
const path = require('path');

router.use(upload.fields([
    {
        name: 'player_avatar[avatar]',
        maxCount: 4
    },
    {
        name: 'player_avatar[player_avatar_type]',
        maxCount: 4
    }
]));

router.post('/update.xml', (req, res) => {
    const avatar = req.files['player_avatar[avatar]'][0];

    if(!avatar) res.status(400);
    if(!avatar) res.send('Missing Avatar');

    const emotion = req.files['player_avatar[player_avatar_type]'] || 'unknown';

    fs.writeFile(path.join(__dirname + `../../../assets/players/debug_${emotion}.png`), avatar.buffer, 'binary', (err) => {
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