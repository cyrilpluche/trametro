var express = require('express');
var router = express.Router();

var usersController = require('../controllers').users;

router.get('/find_one', usersController.findOne);
router.get('/', usersController.endPoint);

module.exports = router;
