module.exports = {
    filtre(req, res, next) {
        try {
            var output = []
            for (let trip of req.body.json) {
                if (trip['route_short_name'] === req.params.id) {
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