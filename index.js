const moment = require('moment');

const mw = require('./alexa-middlewares');

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Bienvenue sur Trametro, quelle ligne vous intéresse ?')
    },
    'ChooseLigneIndent': function () {
        var isDownloaded = mw.download.fromURL()
        var params = this.event.request.intent.slots
        var ligne, direction, station

        try {
            ligne = params.ligneNumber.value
        } catch (e) {
            ligne = null
        }
        try {
            direction = params.direction.value
        } catch (e) {
            direction = null
        }
        try {
            station = params.station.value
        } catch (e) {
            station = null
        }

        try {
            // var url = "/api/schedule/find_one?id=" + ligne + "&stop=" + station + "&destination=" + station
            var json = mw.parser.parse()
            var schedules = mw.filter.filtre(json, ligne.toString(), direction, station)

            this.emit(':tell', 'Le tramway ' + ligne + ' direction ' + direction + 'passe dans ' + schedules[0] + ' à ' + station)
        } catch (e) {

        }


        this.emit(':tell', 'ligne un')
    },
    'AMAZON.HelpIntent': function () {

    },
    'AMAZON.CancelIntent': function () {

    },
    'AMAZON.StopIntent': function () {

    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
