var Traveler = require('../config/db_connection').Traveler;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {


    /*  localhost:3000/api/traveler/find_one?id=id&status=status
     *
     *  return: Traveler object.
     */
    findOne(req, res) {
        return Traveler
            .findOne({
                where: {
                    travelerId : req.param('id'),
                }
            })
            .then(traveler => {
                res.status(201).send(traveler)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:3000/api/traveler/first_find_one?id=id
     *
     *  return: Traveler object if founded with a init status of '0' or create it.
     */
    firstFindOne(req, res) {
        return Traveler
            .findOne({
                where: {
                    travelerId : req.param('id'),
                }
            })
            .then(traveler => {
                if (traveler) {
                    Traveler
                        .update({ travelerStatus: '0' }, {
                            where: { travelerId: req.param('id') }
                        })
                        .then(isUpdated => {
                            res.status(201).send(traveler)
                        })
                        .catch(error => res.status(400).send(error));
                }
                else {
                    Traveler
                        .create({
                            travelerId: req.param('id'),
                            travelerStatus: '0',
                            travelerName: ""
                        })
                        .then(newTraveler => {
                            res.status(201).send(newTraveler)
                        })
                        .catch(error => res.status(400).send(error));
                }
            })
            .catch(error => res.status(400).send(error));
    },



    /*  localhost:4200/api/traveler/update?id=id&etc...
     *
     *  return: Middleware that set travelerStatus to 1.
     */
    initStatus(req, res, next) {
        return Traveler
            .update({ travelerStatus: req.param('status') }, {
                where: { travelerId: req.param('id') }
            })
            .then(isUpdated => {
                next()
            })
            .catch (e => {
                error = {
                    type: 'INTERNAL_ERROR',
                    message: "Error is : " + e,
                    status: 500
                }
                next(error);
            })
    },

    /* ============== NEW VERSION ============== */
    /* ============== NEW VERSION ============== */

    /*
     * Return: Find the traveler with the given id.
     */
    get(req, res, next) {
        return Traveler
            .findOne({
                where:  {travelerId: req.query.travelerId}
            })
            .then(traveler => {
                req.body.answer = traveler;
                next();
            })
            .catch (err => {
                res.send(400, 'Traveler:get / ' + err.message);
            })
    },

    /*
     *  req.body = {
     *      travelerId: String,
     *      travelerStatus: String,
     *      travelerName: String (optional)
     *  }
     *
     *  return: create a new Traveler.
     */
    create(req, res, next) {
        if (req.body.answer) {
            // User already exist
            next()
        } else {
            // User is new
            return Traveler
                .create({
                    travelerId: req.query.travelerId
                })
                .then(traveler => {
                    req.body.answer = traveler
                    next()
                })
                .catch(err => res.send(400, 'Traveler:create / ' + err.message));
        }
    },

    /*
     *  req.body = {
     *      tripFavorite = String
     *  }
     *
     *  return: true if the update is done, else false.
     */
    update(req, res, next) {
        try {
            if (req.body.answer.dataValues) {
                return Traveler
                    .update({ tripFavorite: req.body.answer.dataValues.tripId }, {
                        where: { travelerId: req.query.travelerId }
                    })
                    .then(isUpdated => {
                        if (isUpdated[0] === 1) {
                            req.body.answer = "C'est fait. Vous pouvez maintenant me le demander n'importe quand."
                            next()
                        }
                        else res.send(400, 'Traveler:update / Trip had not been add to favorite.')
                    })
                    .catch(err => res.send(400, 'Traveler:update / ' + err.message));
            } else {
                res.send(400, 'Traveler:update / No finished session found.')
            }
        } catch (err) {
            res.send(400, 'Traveler:update / No session trip found.')
        }

    },

    /*
     * Return: Find the traveler with the given id.
     */
    bodyToQuery(req, res, next) {
        if (req.body.answer) {
            if (req.body.answer.dataValues.tripFavorite) {
                req.query.tripId = req.body.answer.dataValues.tripFavorite
                next()
            } else {
                res.send(400, 'Traveler:bodyToQuery / No trip favorite yet.')
            }
        } else {
            res.send(400, 'Traveler:bodyToQuery / No user found.')
        }
    }
}
