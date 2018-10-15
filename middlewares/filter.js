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
            req.body.result = output;
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