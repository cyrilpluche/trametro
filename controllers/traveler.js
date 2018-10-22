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

    /*  localhost:3000/api/traveler/find_one/:id
     *
     *  return: Traveler object if founded.
     */
    findOne(req, res) {
        return Traveler
            .findOne({
                where: {
                    travelerId : req.params.id
                }
            })
            .then(traveler => {
                if (traveler) res.status(201).send(traveler)
                else {
                    req.body.travelerId = req.params.id
                    Traveler
                        .create({
                            travelerId: req.params.id,
                            travelerName: ""
                        })
                        .then(traveler => {
                            res.status(201).send(traveler)
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
    }
}
