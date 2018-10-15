module.exports = {
    filtre(json, ligne, direction, station) {
        try {
            var output = []
            // Keep only 3 concerned rows
            for (let trip of json) {
                if (trip['route_short_name'] === ligne &&
                    trip['stop_name'].toLowerCase() === station.toLowerCase() &&
                    trip['trip_headsign'].toLowerCase() === direction.toLowerCase()) {
                    output.push(trip)
                }
            }

            // Compute the amount of minutes between date now and next session tramway
            var dateNow = moment(Date.now()).format('YYYY-M-DD')
            var nextTransport = []
            for (let s of output) {
                var interval = moment(dateNow + ' ' + s.departure_time).diff(Date.now(), 'minutes')
                nextTransport.push(interval)
            }

            return nextTransport
        } catch (e) {
            return []
        }
    }
}