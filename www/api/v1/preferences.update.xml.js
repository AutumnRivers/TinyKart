// Sets preferences for the server, not the client, sort of
// Sets preferences for how the client communicates with the server
// This is stupid, MM, I hate you
const router = require('express').Router();

const languageCodeRegex = /^d[ae]|en-(gb|us)|es(-mx)?|f[ir]|it|ja|ko|n[lo]|p(l|t(-br)?)|ru|sv|zh-(cn|tw)$/;
const timezoneRegex = /^[-+]?[0-9]{1,4}$/;
const regionRegex = /^(scea|scee|sceasia|scej)$/;

router.use('/', (req,res,next) => {

    console.log('Connection made with method ' + req.method + ', here\'s what they sent:')
    console.log(req.body); // Debug
    console.log('Is Secure: ' + req.secure);
    next()

})

router.get('/', (req, res) => {
    const startXML = '<result><status><id>0</id><message>Successful completion</message></status><response>'
    const endXML = '</response></result>'
    var preferencesTag

    // This will be dynamic in the future but for now it is fine being EST
    const langCode = 'en-us'
    const timezone = '-5'
    const regionCode = 'scea'
    const cookieDomain = 'localhost'
    const ipAddress = '127.0.0.1'

    preferencesTag = `<preferences language_code="${langCode}" timezone="${timezone}" region_code="${regionCode}" domain="${cookieDomain}" ip_address="${ipAddress}"></preferences>`

    const finalResponse = startXML + preferencesTag + endXML;

    res.set('Content-Type', 'application/xml');
    res.send(finalResponse)
})

module.exports = router;