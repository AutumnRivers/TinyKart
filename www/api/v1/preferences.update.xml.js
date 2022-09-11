// Sets preferences for the server, not the client, sort of
// Sets preferences for how the client communicates with the server
// This is stupid, MM, I hate you
const router = require('express').Router();

const XML2JS = require('xml2js');

const languageCodeRegex = /^d[ae]|en-(gb|us)|es(-mx)?|f[ir]|it|ja|ko|n[lo]|p(l|t(-br)?)|ru|sv|zh-(cn|tw)$/;
const timezoneRegex = /^[-+]?[0-9]{1,4}$/;
const regionRegex = /^(scea|scee|sceasia|scej)$/;

router.post('/', (req, res) => {
    const xmlBuilder = new XML2JS.Builder({ headless: true });

    // This will be dynamic in the future but for now it is fine being EST
    const langCode = 'en-us'
    const timezone = '-5'
    const regionCode = 'scea'
    const cookieDomain = 'localhost'
    const ipAddress = '127.0.0.1'

    const preferencesObject = {
        result: {
            status: {
                id: 0,
                message: 'Successful completion'
            },
            response: {
                preferences: {
                    $: {
                        language_code: langCode,
                        timezone: timezone,
                        region_code: regionCode,
                        domain: cookieDomain,
                        ip_address: ipAddress
                    }
                },
                _: ''
            }
        }
    };

    const finalResponse = xmlBuilder.buildObject(preferencesObject);

    res.set('Content-Type', 'application/xml');
    res.cookie('playco', 'BAh7C0kiD3Nlc3Npb25faWQGOgZFRiJFYmQ2MGFjYTc0ZGJhOTE3YWNmNjhk\nMDA0MGIyZjU5MTJjY2FjNjUyMWI3OTU2MGEwMjRkMzM5MGI2MGVlZjU1NUki\nC2RvbWFpbgY7AEZJIgAGOwBUSSISbGFuZ3VhZ2VfY29kZQY7AEZJIgplbi11\ncwY7AFRJIhByZWdpb25fY29kZQY7AEZJIglzY2VhBjsAVEkiDXRpbWV6b25l\nBjsARkkiCS0zMDAGOwBUSSINcGxhdGZvcm0GOwBGSSIIUFMzBjsAVA==\n--8e68a09f4c4485335b695fc22474cf2a37bbb18c', { httpOnly: true, path: '/' });
    res.send(finalResponse);
})

module.exports = router;