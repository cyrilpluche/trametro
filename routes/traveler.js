var express = require('express');
var router = express.Router();
var travelerController = require('../controllers').traveler;

router.get('/find_one', travelerController.findOne)
router.post('/create', travelerController.create);
router.post('/update/:id', travelerController.update);


module.exports = router;
