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
            let ligneTAM, stationTAM, directionTAM
            // Select 3 schedules
            if (req.body.trip) {
                ligneTAM = helper.ligneToTam(req.body.trip.ligneCode)
                stationTAM = helper.stationToTAM(req.body.trip.stationCode)
                directionTAM = helper.directionToTAM(req.body.trip.directionCode)
            } else {
                ligneTAM = helper.ligneToTam(req.param('id'))
                stationTAM = helper.stationToTAM(req.param('stop'), ligneTAM)
                directionTAM = helper.directionToTAM(req.param('destination'))
            }

            for (let trip of req.body.json) {
                if (trip['route_short_name'] === ligneTAM &&
                    trip['stop_name'].toLowerCase() === stationTAM.toLowerCase() &&
                    trip['trip_headsign'].toLowerCase() === directionTAM.toLowerCase()) {
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