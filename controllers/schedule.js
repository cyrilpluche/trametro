module.exports = {
    findOne(req, res) {
        let answer
        if (req.body.result[0] === "proche") {
            answer = 'Le tramway ligne ' + req.param('id') + ', direction ' + req.param('destination') + ', est ' + req.body.result[0] + ' de ' + req.param('stop')
        } else {
            answer = 'Le tramway ligne ' + req.param('id') + ', direction ' + req.param('destination') + ', arrive dans ' + req.body.result[0] + ' minutes à ' + req.param('stop')
        }
        return res.status(201).json(answer)
    },

    findAll(req, res) {
        let answer
        if (req.body.result[0] === "proche") {
            if (req.body.result[1] !== "proche") {
                answer = 'Le prochain tramway , est ' + req.body.result[0] + '. Les suivants arrivent dans ' + req.body.result[1] + ' et ' + req.body.result[0] + ' minutes à ' + req.param('stop')
            } else {
                answer = 'Les deux prochains tramway , sont ' + req.body.result[0] + '. Le suivant arrive dans ' + req.body.result[0] + ' minutes à ' + req.param('stop')
            }
        } else {
            answer = 'Les prochains tramway arrivent dans ' + req.body.result[0] + ', ' + req.body.result[1] + ' et ' + req.body.result[2] + ' minutes à ' + req.param('stop')
        }
        return res.status(201).json(answer)
    }
}
