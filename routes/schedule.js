var express = require('express');
var router = express.Router();

var scheduleController = require('../controllers').schedule;
var tripController = require('../controllers').trip;
var travellerController = require('../controllers').traveler;


var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;

/* ======== NEW VERSION ======== */
router.get('/one_shot',
    tripController.createOneShot,
    downloadMiddleware.fromURL,
    parseMiddleware.parse,
    filterMiddleware.oneShotFilter,
    scheduleController.returnOneSchedule
)

router.get('/session_shot',
    tripController.createOneShot,
    downloadMiddleware.fromURL,
    parseMiddleware.parse,
    filterMiddleware.oneShotFilter,
    scheduleController.returnThreeSchedule
)



module.exports = router;
