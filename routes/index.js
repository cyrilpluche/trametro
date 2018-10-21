var express = require('express');
var router = express.Router();

router.use('/traveler', require("./traveler"));
router.use('/schedule', require("./schedule"))

module.exports = router;