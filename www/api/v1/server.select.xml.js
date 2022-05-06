/* This should technically be the file where the game selects a server 
We're not going to let it do that because we'd need Sony certs 
Timing out the request works, though... for some reason. */
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('Server being selected, timeoutting...')
    setTimeout(() => {}, 31000);
})

module.exports = router;