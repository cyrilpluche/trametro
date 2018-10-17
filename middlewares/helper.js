module.exports = {

    ligneToTam (ligne) {
        let un = ["une", "un"]
        if (un.includes(ligne)) return "1"
        else if (ligne === "deux") return "2"
        else if (ligne === "trois") return "3"
        else if (ligne === "quatre") return "4"
        else return ligne
    },

    stationToTAM (station, ligne) {
        if (ligne === "1") {
            if (station === "corum") return "corum t1"
            else if (station === "gare saint roch") return "gare st-roch"
            else if (station === "hopital lapeyronie") return "hop. lapeyronie"
            else if (station === "place de l'europe") return "pl. de l'europe"
            else return station
        } else if (ligne === "2") {

        } else {
            return station
        }
    },

    directionToTAM (direction) {
        let mosson = ["maussan", "mossan", "mausson"]
        if (mosson.includes(direction)) return "mosson"
        else return direction
    }
}
