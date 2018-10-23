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
            else if (station === "rives du lez") return "rives du lez t1"
            else if (station === "mosson") return "mosson t1"
            else return station
        } else if (ligne === "2") {
            if (station === "corum") return "corum t2"
            else if (station === "gare st-roch") return "gare st-roch t2"
            else return station
        } else if (ligne === "3") {
            if (station === "gare st-roch") return "gare st-roch t3"
            else if (station === "rives du lez") return "rives du lez t3"
            else if (station === "mosson") return "mosson t3"
            else return station
        } else if (ligne === "4") {
            if (station === "gare st-roch") return "gare st-roch t3"
            if (station === "place albert 1er") return "albert 1er"
            else return station
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
