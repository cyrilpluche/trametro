var express = require('express');
var router = express.Router();

module.exports = {
    findOne(req, res) {
        return res.status(201).json(req.body.result)
    }
}
