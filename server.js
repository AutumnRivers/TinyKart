/*
    TinyKart (Okay maybe final name)
    LittleBigPlanet Karting private server

    Based off the LBPK/MDNR hybrid server, now defunct: https://github.com/Gamer4647/karting-archive
    Completely remade in NodeJS 14
*/
const serverPort = 10050;
const altPort = 80;

const express = require('express');

const session = require('express-session');
const sqliteStoreFactory = require('express-session-sqlite').default;

const https = require('https')
const fs = require('fs')

const { open } = require('sqlite');
const sql3 = require('sqlite3-lite');

const SqliteStore = sqliteStoreFactory(session);

const server = express();
const altServer = express();

// Debug to make sure everyting works
server.use((req, res, next) => {
    console.log('CONNECTION RECEIVED. USER AGENT: ' + req.get('User-Agent') + ' at ' + (new Date).toString());
    console.log('Above connection tried to connect to ' + req.url + ' with the ' + req.method + ' method.');
    next();
})

altServer.use((req, res, next) => {
    console.log(`----- Connection to alternative server. -----\nRequest URL: ${req.url}\nRequest method: ${req.method}\n----- End connection details -----`);
    res.status(200);
    res.send('OK')
})

// Security headers, nerd stuff, will probably change later
server.use((req, res, next) => {
    res.set({
        "Content-Security-Policy": "frame-src 'none';",
        "X-XSS-Protection": "1",
        "X-Frame-Options": "DENY"
    });

    next();
});

const httpsOptions = {
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.cert')
}

// Set up session stuff
server.use(session({
    store: new SqliteStore({
        driver: sql3.Database,
        path: './session_db.sqlite',
        ttl: 5000 //14400000 // I actually don't fully know what this does but 4 hours seems good
    }),
    resave: true,
    saveUninitialized: false,
    secret: process.env.TINYKART_SECRET // environment variable. if self hosting you can probably just use a blank value but you need SOMETHING here otherwise Express will yell at you. if using a public server i'd recommend generating a secure password.
}));

// Okay, let's do things now.
server.use(express.static('./www'));
server.use('/resources', require('./www/api/v1.js'));

// Show landing page
server.get('/', (req, res) => {
    //res.status(400);
    res.sendFile(__dirname + '/www/misc/landing_page.txt');
});

server.post('/preferences.xml', (req, res) => {
    res.status(200)
    console.log('Preferences file sent: ' + req.body)
    res.sendFile(__dirname + '/www/preferences.xml')
})

server.get('/policies/view.xml', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/www/policy.xml')
})

server.post('/session/login_np.xml', (req, res) => {
    console.log('Login being made')
    res.status(200)
})

server.listen(serverPort);
//altServer.listen(altPort);
console.info('TinyKart is running on port ' + serverPort);

/*https.createServer(httpsOptions, server).listen(serverPort, () => {
    console.info('TinyKart is running on port ' + serverPort);
})*/