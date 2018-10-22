var Trip = require('../config/db_connection').Trip;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {
    /*  localhost:3000/api/traveler/create
     *
     *  req.body = {
     *      stationCode = pl de l'europe, (optional)
     *      stationName = place de l'europe, (optional)
     *      ligneCode = 1, (optional & string)
     *      directionCode = nd de sablassou, (optional)
     *      directionName = notre dame de sablassou, (optional),
     *      tripIsFavorite = true,
     *      travelerId = alexaid0
     *  }
     *
     *  return: Middleware that create a trip if needed.
     */
    create(req, res, next) {
        // The trip already exist
        if (req.body.trip) next()
        else {
            // We need to create this new trip
            Trip
                .create({
                    travelerId: req.param('id'),
                    sessionId: req.param('session'),
                    tripIsFavorite: req.param('isfav')
                })
                .then(trip => {
                    req.body.trip = trip
                    next()
                })
                .catch(error => res.status(400).send(error));
        }
    },

    /*  localhost:3000/api/traveler/find_one?id=alexaid&session=sessionid&isfav=true
     *
     *  return: Middleware that search for the trip or create it.
     */
    findOne(req, res, next) {
        if (req.param('isfav') === 'false') {
            return Trip
                .findOne({
                    // We are searching for a random trip
                    where: {
                        travelerId: req.param('id'),
                        sessionId: req.param('session'),
                        tripIsFavorite: req.param('isfav')
                    }
                })
                .then(trip => {
                    req.body.trip = trip
                    next()
                })
                .catch(error => res.status(400).send(error));
        } else {
            // We are searching for a fav trip
            return Trip
                .findOne({
                    where: {
                        travelerId: req.param('id'),
                        tripIsFavorite: req.param('isfav')
                    }
                })
                .then(trip => {
                    req.body.trip = trip
                    next()
                })
                .catch(error => res.status(400).send(error));
        }
    },

    /*  localhost:4200/api/traveler/update?id=alexaid&session=id&isfav=true
     *
     *  req.body = {
     *      stationCode: pl de l'europe, (optional)
     *      stationName: place de l'europe, (optional)
     *      ligneCode: 1, (optional & string)
     *      directionCode: nd de sablassou, (optional)
     *      directionName: notre dame de sablassou, (optional),
     *      tripIsFavorite: false,
     *      sessionid: id
     *  }
     *
     *  return: true if the update is done, else false.
     */
    update(req, res, next) {
        if (req.param('isfav') === 'false') {
            return Trip
                .update(req.body, {
                    where: {
                        travelerId: req.body.trip.travelerId,
                        sessionId: req.body.trip.sessionId,
                        tripIsFavorite: req.body.trip.tripIsFavorite
                    }
                })
                .then(isUpdated => {
                    res.status(201).send(isUpdated[0] === 1)
                })
                .catch(error => res.status(400).send(error));
        } else {
            return Trip
                .update(req.body, {
                    where: {
                        travelerId: req.body.trip.travelerId,
                        tripIsFavorite: req.body.trip.tripIsFavorite
                    }
                })
                .then(isUpdated => {
                    res.status(201).send(isUpdated[0] === 1)
                })
                .catch(error => res.status(400).send(error));
        }
    },

    findAndReplaceFav(req, res, next) {
        Trip
            .findOne({
                // We are searching for the trip of the session
                where: {
                    travelerId: req.param('id'),
                    sessionId: req.param('session'),
                    tripIsFavorite: false
                }
            })
            .then(trip => {
                let body = {
                    tripIsFavorite: true,
                    stationCode: trip.dataValues.stationCode,
                    ligne_code: trip.dataValues.ligne_code,
                    directionCode: trip.dataValues.directionCode
                }

                return Trip
                    .update(body, {
                        where: {
                            travelerId: req.param('id'),
                            tripIsFavorite: true
                        }
                    })
                    .then(isUpdated => res.status(201).send(isUpdated[0] === 1))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
}
