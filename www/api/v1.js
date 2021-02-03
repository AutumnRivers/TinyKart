/*
    Main API file. This is what's used for the api... obviously.
*/

const router = require('express').Router();

router.use('/announcement.list.xml', require('./v1/announcement.list.xml.js'));
router.use('/server.select.xml', require('./v1/server.select.xml.js'));
router.use('/profanity_filter.list.xml', require('./v1/profanity_filter.list.xml.js'));

module.exports = router;