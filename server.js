/*
    TinyKart
    LittleBigPlanet Karting emulated server

    Based off the LBPK/MDNR hybrid server, now defunct: https://github.com/Gamer4647/karting-archive
    Completely remade in NodeJS 14
*/
const boxen = require('boxen');

const fs = require('fs');

const serverPort = 10050;
const altPort = 10051;

const express = require('express');

const session = require('express-session');
const sqliteStoreFactory = require('express-session-sqlite').default;

const https = require('https');

const { open } = require('sqlite');
const sql3 = require('sqlite3-lite');

const SqliteStore = sqliteStoreFactory(session);

const server = express();
const altServer = express();

const bodyParser = require('body-parser');

// Exit handler
const expectedExitHandler = () => {
    console.info(`\n\nTinyKart is shutting down... Thanks for riding in the Imagisphere!`);
    process.exit(0);
}

const unexpectedExitHandler = (err) => {
    console.trace(err);
    console.info("\n\nSomething has gone very, very wrong... TinyKart is shutting down!");
    process.exit(1);
}

process.on('exit', expectedExitHandler);
process.on('SIGINT', expectedExitHandler);
process.on('SIGUSR1', expectedExitHandler);
process.on('SIGUSR2', expectedExitHandler);
process.on('uncaughtException', unexpectedExitHandler);

// Debugs
if(process.argv.includes('--test-crash')) {
    throw new Error("This is a test crash, pls ignore thank you :)");
}

// Debug to make sure everyting works
server.use((req, res, next) => {
    console.log('CONNECTION RECEIVED. USER AGENT: ' + req.get('User-Agent') + ' at ' + (new Date).toString());
    console.log('Above connection tried to connect to ' + req.url + ' with the ' + req.method + ' method.');
    next();
})

altServer.use((req, res, next) => {
    bodyParser.raw();
    console.log(`----- Connection to alternative server. -----\nRequest URL: ${req.url}\nRequest method: ${req.method}\nRequest body: ${req.body}\n----- End connection details -----`);
    next();
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
    key: fs.readFileSync('./security/localhost-key.pem', 'utf-8'),
    cert: fs.readFileSync('./security/localhost.pem', 'utf-8')
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
server.use('/', require('./www/api/v1.js'));

altServer.post('/session/login_np.xml', (req, res) => {
    res.sendFile(__dirname + '/www/session/login_np.xml');
});

// Show landing page
server.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/misc/landing_page.txt');
});

server.listen(serverPort);
https.createServer(httpsOptions, altServer).listen(altPort);

if(process.argv[2] == '--show-box' && process.argv[3] === 'false') {
    console.log("Not logging box style due to command line argument.\n\n" + `TinyKart's API is running on port ${serverPort}\nTinyKart's Secure API is running on port ${altPort}`);
} else {
    console.log(boxen(`TinyKart's API is running on port ${serverPort}\nTinyKart's Secure API is running on port ${altPort}\n\nEverything gets logged here. To log to a file, run "yarn startlogs"`, {
        title: `TinyKart v${require('./package.json').version}`,
        titleAlignment: 'left',
        borderStyle: 'round',
        padding: 2,
        float: 'center',
        textAlignment: 'center'
    }));
}