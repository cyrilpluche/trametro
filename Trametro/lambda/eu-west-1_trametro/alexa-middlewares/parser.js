module.exports = {
    parseLigneIndent(slot) {
        let ligne, direction, station
        try {
            ligne = slot.ligne.value
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
            ligneCode: ligne,
            directionCode: direction,
            stationCode: station
        }
    }
}