var Traveler = require('../config/db_connection').Traveler;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {
    /*  localhost:3000/api/traveler/create
     *
     *  req.body = {
     *      travelerId = id,
     *      travelerName = lastname (optional)
     *  }
     *
     *  return: Traveler object created.
     */
    create(req, res) {
        return Traveler
            .create(req.body)
            .then(traveler => {
                res.status(201).send(traveler)
            })
            .catch(error => res.status(400).send(error));
    },

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

    /*  localhost:4200/api/traveler/update/id
     *
     *  req.body = {
     *      travelerName = Cyril
     *  }
     *
     *  return: true if the update is done, else false.
     */
    update(req, res, next) {
        return Traveler
            .update(req.body, {
                where: { travelerId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated[0] === 1)
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
    }

}
