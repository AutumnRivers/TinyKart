/*
    Main API file. This is what's used for the api... obviously.
*/

const router = require('express').Router();
const static = require('express').static;
const path = require('path');

const successXML = path.join(__dirname + '../../success.xml');

router.use('/resources', static(__dirname + '/v1/static'));

router.use('/preferences.xml', require('./v1/preferences.update.xml.js'));
router.use('/achievements.xml', require('./v1/achievement.list.xml.js'));
router.use('/player_avatars', require('./v1/update_player_avatar.js'));
router.use('/servers/select.xml', require('./v1/server.select.xml'));
router.use('/announcement.list.xml', require('./v1/announcement.list.xml.js'));
router.use('/profanity_filters.xml', require('./v1/profanity_filter.list.xml.js'));
router.use('/tags.xml', require('./v1/tag.list.xml.js'));
router.use('/single_player_games/create_finish_and_post_stats.xml', require('./v1/post_singleplayer_stats.js'));
router.use('/sub_leaderboards', require('./v1/view_leaderboard.js'));

router.get('/policies/view.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname + '../../policy.xml'));
});

router.post('/session/set_presence.xml', (req, res) => {
    res.status(200);
    res.sendFile(successXML);
});

router.post('/session/ping.xml', (req, res) => {
    res.status(200);
    res.sendFile(successXML);
});

router.get('/player_creation_comments.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../misc/example_comment_list.xml'));
});

router.get('/player_profile/view.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../misc/example_profile.xml'));
});

router.post('/player_creations/verify.xml', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../player_creations/verify.xml'));
})

module.exports = router;