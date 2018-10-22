var express = require('express');
var router = express.Router();
var travelerController = require('../controllers').traveler;

router.get('/find_one', travelerController.findOne)
router.get('/first_find_one', travelerController.firstFindOne)
router.post('/create', travelerController.create);
router.post('/update/:id', travelerController.update);


module.exports = router;
