module.exports = {

    stationToTAM (station, ligne) {
        if (ligne === "1") {
            if (station === "corum") return "corum t1"
            else if (station === "gare saint roch") return "gare st-roch"
            else if (station === "hopital lapeyronie") return "hop. lapeyronie"
            else if (station === "place de l'europe") return "pl. de l'europe"
            else return station
        } else {
            return station
        }
    }
}
