/*
    TinyKart (Not final name)
    LittleBigPlanet Karting private server

    Based off the LBPK/MDNR hybrid server, now defunct: https://github.com/Gamer4647/karting-archive
    Completely remade in NodeJS 14
*/
const serverPort = 8080;

const express = require('express');
const server = express();

// Security headers, nerd stuff, will probably change later
server.use((req, res, next) => {
    res.set({
        "Content-Security-Policy": "frame-src 'none';",
        "X-XSS-Protection": "1",
        "Strict-Transport-Secrutiy": "max-age=5184000",
        "X-Frame-Options": "DENY"
    });
    next();
});

// Okay, let's do things now.
server.use(express.static('./www'));
server.use('/api/v1', require('./www/api/v1.js'));

// Show landing page
server.get('/', (req, res) => {
    res.status(400);
    res.sendFile(__dirname + '/www/misc/landing_page.txt');
});

server.listen(serverPort);
console.info('TinyKart is running on port ' + serverPort);