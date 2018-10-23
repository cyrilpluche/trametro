module.exports = {
    findOne(req, res) {
        let answer
        if (req.body.result[0] === "proche") {
            answer = 'Le tramway ligne ' + req.body.ligneTAM + ', direction ' + req.body.directionTAM + ', est ' + req.body.result[0] + ' de ' + req.body.stationTAM
        } else {
            answer = 'Le tramway ligne ' + req.body.ligneTAM + ', direction ' + req.body.directionTAM + ', arrive dans ' + req.body.result[0] + ' minutes à ' + req.body.stationTAM
        }
        if (answer.includes("undefined")) answer = "Horaires indisponibles pour le moment."
        return res.status(201).send(answer)
    },

    findAll(req, res) {
        let answer
        if (req.body.result[0] === "proche") {
            if (req.body.result[1] !== "proche") {
                answer = 'Le prochain tramway , est ' + req.body.result[0] + '. Les suivants arrivent dans ' + req.body.result[1] + ' et ' + req.body.result[2] + ' minutes à ' + req.param('stop')
            } else {
                answer = 'Les deux prochains tramway , sont ' + req.body.result[0] + '. Le suivant arrive dans ' + req.body.result[2] + ' minutes à ' + req.param('stop')
            }
        } else {
            answer = 'Les prochains tramway arrivent dans ' + req.body.result[0] + ', ' + req.body.result[1] + ' et ' + req.body.result[2] + ' minutes à ' + req.param('stop')
        }

        if (answer.includes("undefined")) answer = "Horaires indisponibles pour le moment."
        return res.status(201).send(answer)
    }
}
