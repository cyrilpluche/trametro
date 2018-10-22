var express = require('express');
var router = express.Router();

var scheduleController = require('../controllers').schedule;
var tripController = require('../controllers').trip;
var travellerController = require('../controllers').traveler;


var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;

router.get('/find_from_web', downloadMiddleware.fromURL, scheduleController.findOne);

// http://localhost:3000/api/schedule/find_one?id=1&stop=antigone&destination=odysseum&isFromDb=false
router.get('/find_one', downloadMiddleware.fromURL, parseMiddleware.parse, filterMiddleware.filtre, parseMiddleware.intToString, scheduleController.findOne);
// http://localhost:3000/api/schedule/find_one_from_db?id=1&session=sessionId&isfav=falseOrTrue&isFromDb=true
router.get('/find_one_from_db', downloadMiddleware.fromURL, tripController.findOne, parseMiddleware.parse, filterMiddleware.filtre, parseMiddleware.intToString, travellerController.initStatus, scheduleController.findOne);
router.get('/find_all', downloadMiddleware.fromURL, parseMiddleware.parse, filterMiddleware.filtre, parseMiddleware.intToString, scheduleController.findAll);


module.exports = router;
