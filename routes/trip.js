var express = require('express');
var router = express.Router();
var tripController = require('../controllers').trip;

//router.get('/find_one', tripController.findOne)
//router.post('/create', tripController.create);

// localhost:3000/api/trip/find_one?id=alexaid&session=sessionid&isfav=true
router.post('/update', tripController.findOne, tripController.create, tripController.update);

module.exports = router;
