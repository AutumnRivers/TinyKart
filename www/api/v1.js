/*
    Main API file. This is what's used for the api... obviously.
*/

const router = require('express').Router();
const static = require('express').static;

router.use('/', static(__dirname + '/v1/static'));

router.use('/announcement.list.xml', require('./v1/announcement.list.xml.js'));
router.use('/server.select.xml', require('./v1/server.select.xml.js'));
router.use('/profanity_filters.xml', require('./v1/profanity_filter.list.xml.js'));
router.use('/achievement.list.xml', require('./v1/achievement.list.xml.js'));
router.use('/tags.xml', require('./v1/tag.list.xml.js'));
//router.use('/preferences.update.xml', require('./v1/preferences.update.xml.js'))

module.exports = router;