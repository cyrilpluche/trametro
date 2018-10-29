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
            else if (req.body.result[0] !== "plus de dix" && req.body.result[1] === "plus de dix") {
                answer = "Le prochain tramway arrive dans " + req.body.result[1] + " minutes. Les deux prochains sont dans " + req.body.result[2] + " minutes."
            }
            else if (req.body.result[0] !== "plus de dix") {
                answer = "Les trois prochains tramways arrivent dans " + req.body.result[0] + ", " + req.body.result[1] + " et " + req.body.result[2] + " minutes."
            }
        }

        answer += answer1 + answer2

        return res.status(201).send(answer)
    },

    /* ======== NEW VERSION ========= */
    returnOneSchedule(req, res, next) {
        try {
            console.log(req.body.answer)
            if (req.body.answer[0]) {
                var sentence = 'Le tramway '

                // We choose between two format of sentence
                if (req.body.answer[0] < 2) {
                    sentence += 'est proche.'
                } else {
                    sentence += 'arrive dans ' + req.body.answer[0] + ' minutes.'
                }

                req.body.answer = sentence;
            } else {
                req.body.answer = 'Ce tramway est actuellement indisponible.'
            }
            next()
        } catch (err) {
            res.send(400, 'Schedule:returnOneSchedule / ' + err.message)
        }
    },

    returnThreeSchedule(req, res, next) {
        try {
            var sentence = '';

            if (req.body.answer.length === 1) {

                let t1 = req.body.answer[0];
                sentence += 'le tramway ';
                if (t1 < 2) {
                    sentence += 'est proche.'
                } else {
                    sentence += 'arrive dans ' + t1 + ' minutes.'
                }

            }
            else if (req.body.answer === 2) {

                let t1 = req.body.answer[0];
                let t2 = req.body.answer[1];

                if (t1 < 2 && t2 < 2) {
                    sentence += 'Les deux prochains tramways sont proches.'
                }
                else if (t1 < 2 && !(t2 < 2)) {
                    sentence += 'Le prochain tramway est proche, le suivant arrive dans ' + t2 + ' minutes.'
                } else {
                    sentence += 'Les prochain tramways arrivent dans ' + t1 + ' et ' + t2 + ' minutes.'
                }

            }
            else if (req.body.answer === 3) {
                let t1 = req.body.answer[0];
                let t2 = req.body.answer[1];
                let t3 = req.body.answer[2];

                if (t1 < 2 && t2 < 2 && t3 < 2) {
                    sentence += 'Les trois prochains tramways sont proches.'
                }
                else if (t1 < 2 && t2 < 2 && !(t3 < 2)) {
                    sentence += 'Les deux prochain tramways sont proches, le suivant arrive dans ' + t3 + ' minutes.'
                }
                else if (t1 < 2 && !(t2 < 2) && !(t3 < 2)) {
                    sentence += 'Le prochain tramway est proche. Les deux suivants arrivent dans ' + t2 + ' et ' + t3 + ' minutes.'
                }
                else if (!(t1 < 2) && !(t2 < 2) && !(t3 < 2)) {
                    sentence += 'Les prochains tramways arrivent dans ' + t1 + ', ' + t2 + ' et ' + t3 + ' minutes.'
                } else {
                    sentence += 'Les prochains tramways arrivent dans ' + t1 + ', ' + t2 + ' et ' + t3 + ' minutes.'
                }
            } else {
                sentence += 'Ce tramway est actuellement indisponible.'
            }

            req.body.answer = sentence;
            next();
        } catch (err) {
            return res.send(400, 'Schedule:returnOneSchedule / ' + err.message)
        }
    },
}
