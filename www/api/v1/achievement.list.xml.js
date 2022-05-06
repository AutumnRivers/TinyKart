// This handles achievement lists, I believe
// Idk I'm just praying it works
const router = require('express').Router();

var page = 1,
    per_page = 50;
    limit = 50;
var accumulated, stickied, current, excess, pages;
const startXML = '<result><status><id>0</id><message>Successful completion</message></status><response>';
const endXML = '</response></result>';

router.get('/', (req, res) => {
    if(req.query.limit) limit = req.query('limit');
    if(req.query.page) page = req.query('page');
    if(req.query.per_page) per_page = req.query('per_page');

    limit = Math.min(Math.max(0, limit), 1000);
    page = Math.min(Math.max(0, page), 1000);
    per_page = Math.min(Math.max(0, per_page), 1000);

    excess = limit;
    pages = 0;
    stickied = 0;
    current = 1;

    accumulated = 0;

    while(excess) {
        if(excess > per_page) {
            excess = excess - per_page;
            if(page === current) {
                stickied = per_page;
            }
            pages++;
            current++;
        } else {
            if(page === current) {
                stickied = excess;
            }
            excess = 0;
            pages++;
        }
    }

    if(page > pages) {
        accumulated = 0;
        stickied = 0;
    } else if(page > 0) {
        accumulated = ((page - 1) * per_page) + 1;
        stickied = (accumulated - 1) + stickied;
    } else {
        accumulated = 0;
        stickied = 0;
    }

    const achievementXML = `<achievements total="${limit}" row_start="${accumulated}" row_end="${stickied}" page="${page}" total_pages="${pages}"></achievements>`

    const finalResult = startXML + achievementXML + endXML;

    res.set('Content-Type', 'application/xml');
    res.send(finalResult);
})

module.exports = router;