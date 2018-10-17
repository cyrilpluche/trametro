const mw = require('./alexa-middlewares');
const https = require('https');

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Bienvenue sur Trametro, quelle ligne vous intéresse ?')
    },
    'ChooseLigneIndent': function () {
        /* Prepare the URL */
        var params = this.event.request.intent.slots
        var args = mw.parser.parseLigneIndent(params)
        var url = "https://trametro.herokuapp.com/api/schedule/find_one?id=" + args.ligne + "&stop=" + args.station + "&destination=" + args.direction

        /* Get the answer from the API */
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                this.emit(':ask', data + ". 'Désirez-vous une autre information ?'")
            });
        })
    },
    'NewInformationIndent': function () {
        var params = this.event.request.intent.slots
        if (params.decision.value === 'oui') {
            this.emit(':ask', 'Quelle ligne vous intéresse ?')
        } else {
            this.emit(':tell', 'A bientôt mon gars sûr.')
        }
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
