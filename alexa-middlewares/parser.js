const csv = require('csvtojson')

module.exports = {
    parse () {
        csv( ({
            delimiter: ';',
            ignoreColumns: /(course|stop_code|stop_id|is_theorical|dest_ar_code|direction_id)/
        }) )
            .fromFile("./public/files/data.csv")
            .then((jsonObj)=>{
                return jsonObj
            })
            .catch(e => { return [] })
    },

    parseLigneIndent(slot) {
        let ligne, direction, station
        try {
            ligne = slot.ligneNumber.value
        } catch (e) {
            ligne = null
        }
        try {
            direction = slot.direction.resolutions.resolutionsPerAuthority[0].values[0].value.name
        } catch (e) {
            try {
                direction = slot.station.value
            } catch (err) {
                direction = null
            }
        }
        try {
            station = slot.station.resolutions.resolutionsPerAuthority[0].values[0].value.name
        } catch (e) {
            try {
                station = slot.station.value
            } catch (err) {
                station = null
            }
        }
        return {
            ligne: ligne,
            direction: direction,
            station: station
        }
    }
}