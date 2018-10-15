var express = require('express');
var router = express.Router();

var scheduleController = require('../controllers').schedule;
var downloadMiddleware = require('../middlewares').download;
var parseMiddleware = require('../middlewares').parser;
var filterMiddleware = require('../middlewares').filter;

router.get('/find_from_web', downloadMiddleware.fromURL, scheduleController.findOne);
router.get('/find_one/:id', parseMiddleware.parse, filterMiddleware.filtre, scheduleController.findOne);

module.exports = router;
