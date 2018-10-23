var moment = require('moment-timezone');
const helper = require('./helper')

module.exports = {
    /* Take the json file, keep 3 schedules and returns the litteral version of the amount of time before the transport
     * arrive to the given station
     * */
    filtre(req, res, next) {
        try {
            var output = []
            req.body.brutValues = []
            // Select 3 schedules
            if (req.param('isFromDb') === 'true') {
                req.body.ligneTAM = helper.ligneToTam(req.body.trip.ligneCode)
                req.body.stationTAM = helper.stationToTAM(req.body.trip.stationCode, req.body.ligneTAM)
                req.body.directionTAM = helper.directionToTAM(req.body.trip.directionCode)
            } else {
                req.body.ligneTAM = helper.ligneToTam(req.param('id'))
                req.body.stationTAM = helper.stationToTAM(req.param('stop'), req.body.ligneTAM)
                req.body.directionTAM = helper.directionToTAM(req.param('destination'))
            }

            for (let trip of req.body.json) {
                if (trip['route_short_name'] === req.body.ligneTAM &&
                    trip['stop_name'].toLowerCase() === req.body.stationTAM.toLowerCase() &&
                    trip['trip_headsign'].toLowerCase() === req.body.directionTAM.toLowerCase()) {
                    output.push(trip)
                }
            }
            // Convert the integer for Alexa
            var nextTransport = []
            for (let s of output) {
                let hou = parseInt(s.departure_time.substring(0, 2))
                let min = parseInt(s.departure_time.substring(3, 5))
                let sec = parseInt(s.departure_time.substring(6, 8))

                let d1 = moment(Date.now()).set({h: hou, m: min, s: sec}).format('YYYY-M-DDThh:mm:ss')
                let d2 = moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DDThh:mm:ss')

                let interval = moment(d1).diff(moment(d2), 'minutes')
                // If we are between midnight, the interval will be negative
                if (interval < 0 && moment(d1).format('hh') === '00') {
                    d1.add(1, 'day')
                    interval = moment(d1).diff(moment(d2), 'minutes')
                }
                req.body.brutValues.push({
                    h: s.departure_time,
                    d1: d1,
                    d2: d2,
                    interval: interval
                })

                nextTransport.push(interval)
            }
            req.body.result = nextTransport;

            next()
        } catch (e) {
            error = {
                type: 'INTERNAL_ERROR',
                message: "Error is : " + e,
                status: 500
            }
            next(error)
        }

    }
}