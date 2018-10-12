var express = require('express');
var router = express.Router();

module.exports = {
    findOne(req, res) {
        return res.status(201).send('Hello user Xxxtentacion')
    },

    endPoint(req, res) {
        return res.status(201).send('Nothing to show')
    }
}
