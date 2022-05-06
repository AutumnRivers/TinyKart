/*
    The tag list is stored locally. This is just a redirect.
*/

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(304);
    res.set({
        "ETag": "a7b49e2e744aa238486b9af469eeabee"
    });
    res.send('');
})

module.exports = router;