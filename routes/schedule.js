var express = require('express');
var router = express.Router();

var scheduleController = require('../controllers').schedule;
var downloadMiddleware = require('../middlewares').download;


router.get('/find_one', downloadMiddleware.fromURL, scheduleController.findOne);

module.exports = router;
