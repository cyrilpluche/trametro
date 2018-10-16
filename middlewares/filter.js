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
                let d1 = moment(moment(Date.now()).tz("Europe/Paris").format('YYYY-M-DD') + ' ' + s.departure_time).tz("Europe/Paris").format('YYYY-M-DDThh:mm:ss');
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