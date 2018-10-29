var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;
var scheduleController = require('../controllers').schedule;

var express = require('express');
var router = express.Router();
var tripController = require('../controllers').trip;

router.get('/find_one', tripController.findOne)
//router.post('/create', tripController.create);

// localhost:3000/api/trip/find_one?id=alexaid&session=sessionid&isfav=true
// find the favorite/not favorite trip. Then create it if needed. Then update it.
router.post('/update', tripController.findOneMW, tripController.create, tripController.update);
router.post('/store_new_favorite_trip', tripController.findAndReplaceFav);

/* ======== NEW VERSION ======== */
router.post('/update_session', tripController.get, tripController.create, tripController.update, tripController.get, tripController.findMissingArguments);
router.get('/get_and_reset', tripController.get, tripController.bodyToQuery, downloadMiddleware.fromURL, parseMiddleware.parse, filterMiddleware.oneShotFilter, tripController.setFinished, scheduleController.returnOneSchedule)

module.exports = router;
