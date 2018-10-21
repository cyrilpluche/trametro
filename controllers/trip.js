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
     *      travelerId = alexaid0
     *  }
     *
     *  return: Traveler object created.
     */
    create(req, res) {
        return Trip
            .create(req.body)
            .then(trip => {
                res.status(201).send(trip)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:3000/api/traveler/find_one/:id
     *
     *  return: Traveler object if founded.
     */
    findOne(req, res) {
        return Trip
            .findOne({
                where: {
                    travelerId : req.params.id
                }
            })
            .then(trip => {
                res.status(201).send(trip)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/traveler/update/id
     *
     *  req.body = {
     *      stationCode = pl de l'europe, (optional)
     *      stationName = place de l'europe, (optional)
     *      ligneCode = 1, (optional & string)
     *      directionCode = nd de sablassou, (optional)
     *      directionName = notre dame de sablassou, (optional),
     *  }
     *
     *  return: true if the update is done, else false.
     */
    update(req, res, next) {
        return Trip
            .update(req.body, {
                where: { travelerId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
    }
}
