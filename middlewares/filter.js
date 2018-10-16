var moment = require('moment-timezone');

module.exports = {
    /* Take the json file, keep 3 schedules and returns the litteral version of the amount of time before the transport
     * arrive to the given station
     * */
    filtre(req, res, next) {
        try {
            var output = []
            req.body.brutValues = []
            // Select 3 schedules
            for (let trip of req.body.json) {
                if (trip['route_short_name'] === req.param('id') &&
                    trip['stop_name'].toLowerCase() === req.param('stop').toLowerCase() &&
                    trip['trip_headsign'].toLowerCase() === req.param('destination').toLowerCase()) {
                    output.push(trip)
                }
            }
            // Convert the integer for Alexa
            var nextTransport = []
            for (let s of output) {
                let d1 = moment(moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DD') + ' ' + s.departure_time);
                let d2 = moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DDThh:mm:ss' + '.000Z')
                let interval = d1.diff(d2, 'minutes')
                req.body.brutValues.push({
                    d1: d1,
                    d2: d2,
                    interval: interval
                })
                // If we are between midnight, the interval will be negative
                if (interval < 0 && d1.format('hh') === '00') {
                    let d11 = moment(moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DD') + ' ' + s.departure_time);
                    d11.add(1, 'day')
                    let d22 = moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DDThh:mm:ss' + '.000Z')
                    interval = d11.diff(d22, 'minutes')
                }
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