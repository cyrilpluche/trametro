var express = require('express');
var router = express.Router();

module.exports = {
    findOne(req, res) {
        let answer
        if (req.body.result[0] === "proche") {
            answer = 'Le tramway ligne ' + req.param('id') + ' direction ' + req.param('destination') + ' est ' + req.body.result[0] + ' de ' + req.param('stop')
        } else {
            answer = 'Le tramway ligne ' + req.param('id') + ' direction ' + req.param('destination') + ' arrive dans ' + req.body.result[0] + ' minutes à ' + req.param('stop')
        }
        return res.status(201).json(answer)
    }
}
