// woo our first js file!
const router = require('express').Router();

const XML2JS = require('xml2js');

const { open } = require('sqlite');
const sql3 = require('sqlite3');

router.get('/', (req, res, next) => {
    res.set('Content-Type', 'application/xml');
    next();
})

open({
    filename: './database.sqlite',
    driver: sql3.Database
}).then(database => {
    const xmlBuilder = new XML2JS.Builder({ headless: true });

    const announcementObject = {
        result: {
            status: {
                id: 0,
                message: 'Successful completion'
            },
            response: {
                announcements: {
                    $: {
                        total: 0
                    },
                    announcement: []
                }
            }
        }
    };
    
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

            let anncmnt = {
                $: {
                    id: announcement.id,
                    subject: announcement.subject,
                    language_code: announcement.language_code,
                    created_at: announcement.created_at,
                    modified_at: announcement.modified_at
                },
                _: announcement.text
            }
    
            announcementList.push(anncmnt);
        });
    
        announcementObject.result.response.announcements.announcement = announcementList;
        announcementObject.result.response.announcements.$.total = noOfAnnouncements;
    
        return new Promise(resolve => {
            const xml = xmlBuilder.buildObject(announcementObject);
            resolve(xml);
        });
    
    }
})

module.exports = router;