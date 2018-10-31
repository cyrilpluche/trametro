var mw = require("../Trametro/lambda/eu-west-1_trametro/alexa-middlewares");

var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;
var scheduleController = require('../controllers').schedule;

var express = require('express');
var router = express.Router();
var tripController = require('../controllers').trip;

/* ======== NEW VERSION ======== */
router.post('/update_session', tripController.get, tripController.create, tripController.update, tripController.get, tripController.findMissingArguments);

router.get('/get_and_reset',
    tripController.get,
    tripController.bodyToQuery,
    downloadMiddleware.fromURL,
    parseMiddleware.parse,
    filterMiddleware.oneShotFilter,
    tripController.setFinished,
    scheduleController.returnOneSchedule
)

module.exports = router;
