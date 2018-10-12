var express = require('express');
var router = express.Router();

router.use('/users', require("./users"));
router.use('/', require("./users"));

router.use('/schedule', require("./schedule"))

module.exports = router;