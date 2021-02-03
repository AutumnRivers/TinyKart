/*
    The profanity filter is stored locally. This is just a redirect.
*/

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(304);
    res.set({
        "ETag": "6e816c0a4113f7f1c46100385b3319fa"
    });
    res.send('');
})

module.exports = router;