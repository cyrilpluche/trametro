var express = require('express');
var router = express.Router();
var tripController = require('../controllers').trip;

router.get('/find_one/:id', tripController.findOne)
router.post('/create', tripController.create);
router.post('/update/:id', tripController.update);

module.exports = router;
