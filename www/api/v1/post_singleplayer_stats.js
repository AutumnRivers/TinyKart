const router = require('express').Router();
const multer = require('multer')();

router.use(multer.any());

router.post('/', (req, res) => {
    console.log(req.files);
    res.send(`<?xml version="1.0" encoding="UTF-8"?><result><status><id>0</id><message>Successful completion</message></status><response><game id="77316287" game_player_id="88175675" game_player_stats_id="87332777"/></response></result>`);
});

module.exports = router;