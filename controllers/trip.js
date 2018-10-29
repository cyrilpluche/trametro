var Trip = require('../config/db_connection').Trip;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {


    /*
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

    /*
     *  return: Middleware that search for the trip or create it.
     */
    findOneMW(req, res, next) {
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
    updateOld(req, res, next) {
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

    /*  localhost:4200/api/traveler/store_new_favorite_trip?id=alexaid&session=id
     *
     *  return: take the last trip and save it as favorite in the database.
     */
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
                    travelerId: req.param('id'),
                    sessionId: req.param('session'),
                    tripIsFavorite: true,
                    stationCode: trip.dataValues.stationCode,
                    ligneCode: trip.dataValues.ligneCode,
                    directionCode: trip.dataValues.directionCode
                }

                return Trip
                    .update(body, {
                        where: {
                            travelerId: req.param('id'),
                            tripIsFavorite: true
                        }
                    })
                    .then(isUpdated => {
                        if (isUpdated[0] === 0) {
                            Trip
                                .create(body)
                                .then(newTrip => {
                                    res.status(201).send(true)
                                })
                                .catch(error => res.status(400).send(error));
                        }
                        else res.status(201).send(isUpdated[0] === 1)
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    /* ================ NEW VERSION ================== */
    /*
     * Return: Find the trip with the given id.
     */
    get(req, res, next) {
        return Trip
            .findOne({
                where:  {
                    sessionId: req.query.sessionId,
                    travelerId: req.query.travelerId
                }
            })
            .then(trip => {
                req.body.answer = trip;
                next();
            })
            .catch (err => {
                res.send(400, 'Trip:get / ' + err.message);
            })
    },

    /*
     * Return: Find the trip with the given id.
     */
    getFavorite(req, res, next) {
        return Trip
            .findOne({
                where:  {
                    tripId: req.query.tripId
                }
            })
            .then(trip => {
                req.body.answer = trip;
                next();
            })
            .catch (err => {
                res.send(400, 'Trip:get / ' + err.message);
            })
    },

    /*
     *  req.body = {
     *      stationCode: String, (optional)
     *      stationName: String, (optional)
     *      ligneCode: String (optional)
     *      directionCode: String, (optional)
     *      directionName: String, (optional),
     *      tripIsFavorite: Bool,
     *      travelerId: String
     *  }
     *
     *  return: Middleware that create a trip if needed.
     */
    create(req, res, next) {
        if (req.body.answer) {
            // Trip already exist
            next()
        } else {
            // Trip is new
            return Trip
                .create(req.body)
                .then(trip => {
                    req.body.answer = trip
                    next()
                })
                .catch(err => res.send(400, 'Trip:create / ' + err.message));
        }
    },

    /*
     *  req.body = {
     *      stationCode: String, (optional)
     *      stationName: String, (optional)
     *      ligneCode: String (optional)
     *      directionCode: String, (optional)
     *      directionName: String, (optional),
     *      tripIsFavorite: Bool,
     *      travelerId: String
     *  }
     *
     *  return: Middleware that update a trip if needed.
     */
    update(req, res, next) {
        return Trip
            .update(req.body, {
                where: {
                    travelerId: req.query.travelerId,
                    sessionId: req.query.sessionId
                }
            })
            .then(isUpdated => {
                //req.body.answer = isUpdated[0] === 1
                next()
            })
            .catch(err => res.send(400, 'Trip:update / ' + err.message));
    },

    /*
     *  return: Middleware that build an Alexa sentence with missing fields.
     */
    findMissingArguments(req, res, next) {
        let t = req.body.answer.dataValues;
        let sentence = '';
        let isComplete = true;

        if (!t.ligneCode) {
            sentence += 'Quelle ligne vous intéresse ?'
            isComplete = false
        }
        else if (!t.directionCode) {
            sentence += 'Quelle direction du tramway ' + t.ligneCode + ' désirez-vous ?'
            isComplete = false
        }
        else if (!t.stationCode) {
            sentence += 'Quelle arrêt vous voulez ?'
            isComplete = false
        }

        req.body.answer = [isComplete, sentence]
        next()
    },

    /*
     *  return: take trip session parameters and set them to the req.query.
     */
    bodyToQuery (req, res, next) {
        try {
            req.query.ligne = req.body.answer.dataValues.ligneCode
            req.query.station = req.body.answer.dataValues.stationCode
            req.query.direction = req.body.answer.dataValues.directionCode
            next()
        } catch (err) {
            res.send(400, 'Trip:bodyToQuery / ' + err.message)
        }
    },

    /*
     *  return: set the field isTripFinished to true instead of false.
     */
    setFinished (req, res, next) {
        return Trip
            .update({ isTripFinished: true }, {
                where: {
                    travelerId: req.query.travelerId,
                    sessionId: req.query.sessionId
                }
            })
            .then(isUpdated => {
                if (isUpdated[0] === 1) next()
                else res.send(400, 'Trip:setFinished / Trip had not been modified.')
            })
            .catch(err => res.send(400, 'Trip:setFinished / ' + err.message));
    }
}
