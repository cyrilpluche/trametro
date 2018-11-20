const mw = require('./alexa-middlewares');
const https = require('https');
const axios = require('axios')

const askAgain = ' Quelle autre ligne vous intéresse ?'
const reprompt = "Pour plus d'insctructions sur comment utiliser Trametro, dites 'aide moi'."

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/traveler/start_session" + query

        let speech = "Bienvenue sur Trametro ! Je peux vous renseigner sur les prochains tramways de montpellier. Quelle ligne vous intéresse ? "
        axios.post(url)
            .then((res) => {
                this.emit(':ask', speech, reprompt)
            })
            .catch((error) => {
                this.emit(':ask', speech, reprompt)
            });

    },
    'ChooseTripIndent': function () {
        // Get the ligne, direction & station of a single voice indent --> Send back the next tramway

        // We retrieve the query arguments
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let params = this.event.request.intent.slots
        let args = mw.parser.parseLigneIndent(params)

        // We build the query for request
        let query = "?travelerId=" + travelerId + "&sessionId=" + sessionId + "&ligneCode=" + args.ligneCode + "&directionCode=" + args.directionCode + "&stationCode=" + args.stationCode
        var url = 'https://trametro.herokuapp.com/api/schedule/one_shot' + query

        // We get the schedule
        axios.get(url)
            .then((res) => {
                this.emit(':ask', res.data + askAgain, reprompt)
            })
            .catch((error) => {
                this.emit(':ask', "Je crois que ce tramway ne circule pas actuellement. Essayez avec un autre peut-être ?", reprompt)
            });
    },
    'ChooseLigneIndent': function () {
        // We retrieve the query arguments
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let params = this.event.request.intent.slots
        let args = mw.parser.parseLigneIndent(params)

        // We build the query for request
        let query = "?travelerId=" + travelerId + "&sessionId=" + sessionId
        var url = 'https://trametro.herokuapp.com/api/trip/update_session' + query
        var url1 = 'https://trametro.herokuapp.com/api/trip/get_and_reset' + query

        let body = {
            ligneCode: args.ligneCode,
            isTripFinished: false,
            sessionId: sessionId,
            travelerId: travelerId
        }

        // We store the ligne
        axios.post(url, body)
            .then((res) => {
                if (res.data[0]) {
                    // We have a complete session
                    axios.get(url1)
                        .then((res) => {
                            this.emit(':ask', res.data + askAgain, reprompt)
                        })
                        .catch((error) => {
                            this.emit(':ask', "Pas d'horaires disponible. Une autre idée ?", reprompt)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1])
                }
            })
            .catch((error) => {
                this.emit(':tell', "Vous parlez d'une ligne ? laquelle ?", reprompt)
            });
    },
    'ChooseDirectionIndent': function () {
        // We retrieve the query arguments
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let params = this.event.request.intent.slots
        let args = mw.parser.parseLigneIndent(params)

        // We build the query for request
        let query = "?travelerId=" + travelerId + "&sessionId=" + sessionId
        var url = 'https://trametro.herokuapp.com/api/trip/update_session' + query
        var url1 = 'https://trametro.herokuapp.com/api/trip/get_and_reset' + query

        let body = {
            directionCode: args.directionCode,
            isTripFinished: false,
            sessionId: sessionId,
            travelerId: travelerId
        }

        // We store the ligne
        axios.post(url, body)
            .then((res) => {
                if (res.data[0]) {
                    // We have a complete session
                    axios.get(url1)
                        .then((res) => {
                            this.emit(':ask', res.data + askAgain, reprompt)
                        })
                        .catch((error) => {
                            this.emit(':ask', "Pas de tramway en ce moment. Un autre trajet sûrement ? ", reprompt)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1], reprompt)
                }
            })
            .catch((error) => {
                this.emit(':tell', "Pardon, quelle direction ? ", reprompt)
            });
    },
    'ChooseStationIndent': function () {
        // We retrieve the query arguments
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let params = this.event.request.intent.slots
        let args = mw.parser.parseLigneIndent(params)

        // We build the query for request
        let query = "?travelerId=" + travelerId + "&sessionId=" + sessionId
        var url = 'https://trametro.herokuapp.com/api/trip/update_session' + query
        var url1 = 'https://trametro.herokuapp.com/api/trip/get_and_reset' + query


        let body = {
            stationCode: args.stationCode,
            isTripFinished: false,
            sessionId: sessionId,
            travelerId: travelerId
        }

        // We store the Station
        axios.post(url, body)
            .then((res) => {
                if (res.data[0]) {
                    // We have a complete session
                    axios.get(url1)
                        .then((res) => {
                            this.emit(':ask', res.data + askAgain, reprompt)
                        })
                        .catch((error) => {
                            this.emit(':ask', "Pas de tram en ce moment. Un autre trajet sûrement ? ", reprompt)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1], reprompt)
                }
            })
            .catch((error) => {
                this.emit(':tell', "Pouvez-vous juste répéter quel arrêt ? ", reprompt)
            });
    },
    'AllSchedulesIndent': function () {
        /* Prepare the URL */
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        var params = this.event.request.intent.slots
        var args = mw.parser.parseLigneIndent(params)
        var url = "https://trametro.herokuapp.com/api/schedule/session_shot?travelerId=" + travelerId + "&sessionId=" + sessionId + "&ligneCode=" + args.ligneCode + "&stationCode=" + args.stationCode + "&directionCode=" + args.directionCode

        /* Get the answer from the API */
        axios.get(url)
            .then((res) => {
                this.emit(':ask', res.data + askAgain, reprompt)
            })
            .catch((error) => {
                this.emit(':tell', "Le service est terminé ou cette combinaison n'existe pas. Besoin d'autre chose ? ", reprompt)
            });
    },
    'StoreFavoriteIndent': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/traveler/store_favorite" + query

        axios.put(url)
            .then((res) => {
                this.emit(':ask', res.data  + askAgain, reprompt)
            })
            .catch((error) => {
                this.emit(':tell', "J'ai besoin d'au moins un trajet valide pour ça. On commence par lequel ? ", reprompt)
            });
    },
    'GetFavoriteIndent': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let query = "?travelerId=" + travelerId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/traveler/get_favorite" + query

        axios.get(url)
            .then((res) => {
                this.emit(':ask', res.data  + askAgain, reprompt)
            })
            .catch((error) => {
                this.emit(':tell', "Vous n'avez aucun trajet en favori. Commencez par me demander une horaire. ", reprompt)
            });
    },
    'AMAZON.HelpIntent': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/trip/delete_last_not_complete" + query
        let speech = "Vous pouvez obtenir une horaire en donnant une ligne, une direction et un arrêt de tramway de Montpellier d'un seul coup ou en plusieurs étapes. Vous pouvez aussi garder un tramway en favori pour les prochaines sessions. Quelle ligne vous intéresse ?"


        axios.delete(url)
            .then((res) => {
                //this.shouldEndSession(true)
                this.emit(':ask', speech)
            })
            .catch((error) => {
                //this.shouldEndSession(true)
                this.emit(':ask', speech)
            });
    },
    'AMAZON.CancelIntent': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/trip/delete_last_not_complete" + query
        let speech = "A bientôt, sur Trametro !"

        axios.delete(url)
            .then((res) => {
                this.emit(':tell', speech)
            })
            .catch((error) => {
                this.emit(':tell', speech)
            });
    },
    'AMAZON.StopIntent': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/trip/delete_last_not_complete" + query
        let speech = "A bientôt, sur Trametro !"

        axios.delete(url)
            .then((res) => {
                this.emit(':tell', speech)
            })
            .catch((error) => {
                this.emit(':tell', speech)
            });
    },
    'SessionEndedRequest': function () {
        // We retrieve the current user & the session he is dealing with.
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let query = "?travelerId=" + travelerId + '&sessionId=' + sessionId

        // We build the URL
        let url = "https://trametro.herokuapp.com/api/trip/delete_last_not_complete" + query
        let speech = "A bientôt, sur Trametro !"

        axios.delete(url)
            .then((res) => {
                this.emit(':tell', speech)
            })
            .catch((error) => {
                this.emit(':tell', speech)
            });
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
