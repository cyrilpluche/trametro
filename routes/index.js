var express = require('express');
var router = express.Router();

router.use('/traveler', require("./traveler"));
router.use('/schedule', require("./schedule"));
router.use('/trip', require("./trip"));

module.exports = router;