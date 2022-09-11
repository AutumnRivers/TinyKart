// This file handles users posting a comment to a level
const router = require('express').Router();

const { open } = require('sqlite');
const sql3 = require('sqlite3');

const successXML = path.join(__dirname + '../../../success.xml');

router.post('/', (req, res) => {
    const decoded = decodeURI(req.body);
    const response = decoded.split('&');
    const commentBody = response[0].split('=')[1];
    res.sendFile(successXML);
});