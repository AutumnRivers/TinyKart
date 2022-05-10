/* This should technically be the file where the game selects a server 
We're not going to let it do that because we'd need Sony certs 
Timing out the request works, though... for some reason. */
const router = require('express').Router();

router.post('/', (req, res) => {
    console.log('Server being selected, timeoutting...');
    console.log(req.query);
    console.log(req.body);
    setTimeout(() => {
        console.log("Server selection has been timed out! TinyKart should be ready to go...");
    }, 31000);
})

module.exports = router;