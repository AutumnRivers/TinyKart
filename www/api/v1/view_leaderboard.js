const router = require('express').Router();
const XML2JS = require('xml2js');
const path = require('path');

router.get('/friends_view.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../../misc/example_leaderboard.xml'));
});

router.get('/around_me.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../../misc/example_global_leaderboard.xml'));
});

router.get('/view.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../../misc/example_preview_leaderboard.xml'));
})

module.exports = router;