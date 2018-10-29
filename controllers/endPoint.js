module.exports = {
    endRes(req, res) {
        let answer = req.body.answer;
        if (answer !== {} && answer !== '' && answer !== null && answer !== undefined) {
            // We can send back the answer
            res.status(201).send(answer)
        } else {
            // Previous middlewares failed, and there is no answer
            res.send(400, 'No result found')
        }
    },

}
