const moment = require('moment');

module.exports = {
    filtre(req, res, next) {
        try {
            var output = []
            for (let trip of req.body.json) {
                if (trip['route_short_name'] === req.param('id') &&
                    trip['stop_name'].toLowerCase() === req.param('stop').toLowerCase() &&
                    trip['trip_headsign'].toLowerCase() === req.param('destination').toLowerCase()) {
                    output.push(trip)
                }
            }
            var dateNow = moment(Date.now()).format('YYYY-M-DD')
            var nextTransport = []
            for (let s of output) {
                var interval = moment(dateNow + ' ' + s.departure_time).diff(Date.now(), 'minutes')
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