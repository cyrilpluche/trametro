var express = require('express');
var router = express.Router();

var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;
var scheduleController = require('../controllers').schedule;

var travelerController = require('../controllers').traveler;
var tripController = require('../controllers').trip;

/* ======== NEW VERSION ======== */
router.post('/start_session', travelerController.get, travelerController.create)
router.put('/store_favorite', tripController.getLastFinished, travelerController.update)

router.get('/get_favorite',
    travelerController.get,
    travelerController.bodyToQuery,
    tripController.getFavorite,
    tripController.bodyToQuery,
    downloadMiddleware.fromURL,
    parseMiddleware.parse,
    filterMiddleware.oneShotFilter,
    scheduleController.returnOneSchedule
)

module.exports = router;
