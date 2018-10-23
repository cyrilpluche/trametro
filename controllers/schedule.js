module.exports = {
    findOne(req, res) {
        var answer = 'Le tramway ligne ' + req.body.ligneTAM + ', '

        if (req.body.directionTAM !== "sens a" && req.body.directionTAM !== "sens b") {
            answer += 'direction '
        }

        answer += req.body.directionTAM

        if (req.body.result[0] === "proche") {
            answer += ', est ' + req.body.result[0] + ' de '
        } else {
            answer += ', arrive dans ' + req.body.result[0] + ' minutes à '
        }

        answer += req.body.stationTAM

        if (answer.includes("undefined")) {
            answer = "Horaires indisponibles pour le moment."
        }

        return res.status(201).send(answer)
    },

    findAll(req, res) {
        let answer = ""
        let answer1 = ""
        let answer2 = ""

        if (req.body.result[0] !== undefined) {
            if (req.body.result[0] === "proche") answer = "Le prochain tramway est " + req.body.result[0] + "."
            else answer = "Le prochains tramway est dans " + req.body.result[0] + " minutes."
        } else {
            answer = "Horaires indisponibles pour le moment."
        }

        if (req.body.result[1] !== undefined) {
            if (req.body.result[1] === "proche") answer = "Les deux prochains tramway sont " + req.body.result[0] + "."
            else if (req.body.result[0] === "proche") answer1 = " Le suivant est dans " + req.body.result[1] + " minutes."
            else if (req.body.result[0] === "plus de dix") answer = "Les deux prochains tramway sont dans " + req.body.result[0] + " minutes."
            else answer = "Les prochains tramways arrivent dans " + req.body.result[0] + " et " + req.body.result[1] + " minutes."
        }

        if (req.body.result[2] !== undefined) {
            if (req.body.result[2] === "proche") answer = " Les trois prochains tramway , sont " + req.body.result[0] + "."
            else if (req.body.result[1] === "proche") answer2 = " Le troisième arrive dans " + req.body.result[2] + " minutes."
            else if (req.body.result[0] === "proche" && req.body.result[1] === "plus de dix") {
                answer1 = " Les deux suivants sont dans " + req.body.result[2] + " minutes."
            }
            else if (req.body.result[0] === "proche") answer1 = "Les deux suivants sont dans " + req.body.result[1] + " et " + req.body.result[2] + " minutes."
            else if (req.body.result[0] !== "plus de dix") {
                answer = "Les trois prochains tramways arrivent dans " + req.body.result[0] + ", " + req.body.result[1] + " et " + req.body.result[2] + " minutes."
            }
        }

        answer += answer1 + answer2

        return res.status(201).send(answer)
    }
}
