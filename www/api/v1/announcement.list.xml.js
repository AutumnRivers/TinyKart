// woo our first js file!
const router = require('express').Router();

const { open } = require('sqlite');
const sql3 = require('sqlite3-lite');

router.get('/', (req, res, next) => {
    res.set('Content-Type', 'application/xml');
    next();
})

open({
    filename: './database.sqlite',
    driver: sql3.Database
}).then(database => {
    const startXML = '<result><status><id>0</id><message>Successful completion</message></status><response>';
    const endXML = '</announcements></response></result>';
    
    router.get('/', (req, res) => {
        getAnnouncements().then(finalResponse => {
            if(!finalResponse) return res.status(500).send('Internal server error');
            res.set('Content-Type', 'application/xml');
            res.send(finalResponse);
        });
    })
    
    async function getAnnouncements() {
    
        var announcementList = [];
        var noOfAnnouncements = 0;
    
        await database.each('SELECT * FROM announcements', (err, announcement) => {
            if(err) {
                return err;
            }
    
            var announcementModifiedDate = announcement.modified_at;
            
            if(!announcement.modified_at) announcementModifiedDate = announcement.created_at;
    
            noOfAnnouncements++;
    
            var anncmnt = `<announcement id="${announcement.id}" subject="${announcement.subject}" language_code="${announcement.language_code}" created_at="${announcement.created_at}" modified_at="${announcementModifiedDate}">${announcement.text}</announcement>`;
    
            announcementList.push(anncmnt);
        });
    
        const finalList = announcementList.join('');
    
        const finalResponse = startXML + `<announcements total="${noOfAnnouncements}">` + finalList + endXML;
    
        return new Promise(resolve => {
            resolve(finalResponse);
        })
    
    }
})

module.exports = router;