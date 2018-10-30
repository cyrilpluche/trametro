const mw = require('./alexa-middlewares');
const https = require('https');
const axios = require('axios')

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

        axios.post(url)
            .then((res) => {
                this.emit(':ask', "Bienvenue sur Trametro. Je peux vous renseigner sur les prochains tramways de montpellier. Qu'est-ce qui vous intéresse ?")
            })
            .catch((error) => {
                this.emit(':tell', 'Une erreur est survenue, veuillez réessayer ou fermer Trametro.')
            });
    },
    'ChooseTripIndent': function () {
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
                this.emit(':ask', res.data)
            })
            .catch((error) => {
                this.emit(':tell', error.message)
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
                            this.emit(':ask', res.data)
                        })
                        .catch((error) => {
                            this.emit(':tell', error.message)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1])
                }
            })
            .catch((error) => {
                this.emit(':tell', error.message)
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
                            this.emit(':ask', res.data)
                        })
                        .catch((error) => {
                            this.emit(':tell', error.message)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1])
                }
            })
            .catch((error) => {
                this.emit(':tell', error.message)
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

        // We store the ligne
        axios.post(url, body)
            .then((res) => {
                if (res.data[0]) {
                    // We have a complete session
                    axios.get(url1)
                        .then((res) => {
                            this.emit(':ask', res.data)
                        })
                        .catch((error) => {
                            this.emit(':tell', error.message)
                        });
                } else {
                    // Session fields not complete
                    this.emit(':ask', res.data[1])
                }
            })
            .catch((error) => {
                this.emit(':tell', error.message)
            });
    },
    'AllSchedulesIndent': function () {
        /* Prepare the URL */
        var params = this.event.request.intent.slots
        var args = mw.parser.parseLigneIndent(params)
        var url = "https://trametro.herokuapp.com/api/schedule/find_all?id=" + args.ligne + "&stop=" + args.station + "&destination=" + args.direction

        /* Get the answer from the API */
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                //this.emit(':ask', args.ligne + " " + args.direction + " " + args.station)

                this.emit(':ask', data + ". 'Désirez-vous une autre information ?'")
            });
        })
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
                this.emit(':ask', res.data)
            })
            .catch((error) => {
                this.emit(':tell', error.message)
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
                this.emit(':ask', res.data)
            })
            .catch((error) => {
                this.emit(':tell', error.message)
            });
    },
    'NewInformationIndent': function () {
        var params = this.event.request.intent.slots
        var userId = this.event.session.user.userId
        var sessionId = this.event.session.sessionId
        var url1 = "https://trametro.herokuapp.com/api/traveler/find_one?id=" + userId
        var url2 = "https://trametro.herokuapp.com/api/traveler/update/" + userId
        var url3 = "https://trametro.herokuapp.com/api/trip/store_new_favorite_trip?id=" + userId + '&session=' + sessionId
        var url4 = "https://trametro.herokuapp.com/api/schedule/find_one_from_db?id=" + userId + "&session=" + sessionId + "&isfav=" + true + "&isFromDb=" + true + "&status=" + '4'

        /* First we get the user */
        axios.get(url1)
            .then((traveler) => {
                if (params.decision.value === 'oui') {

                    if (traveler.data.travelerStatus === '0') {
                        // The user didn't complete a session trip
                        this.emit(':ask', 'Reprenons du début. Quelle ligne de tramway vous intéresse ?')
                    }
                    else if (traveler.data.travelerStatus === '1') {
                        // The user still want to ask random trips
                        let body = { travelerStatus: 2 }
                        axios.post(url2, body)
                            .then((res) => {
                                if (res.data === true) this.emit(':ask', 'Quelle ligne de tramway vous intéresse ?')
                                else this.emit(':ask', "Je n'ai pas bien compris, une autre ligne vous intéresse ?")
                            })
                    }

                    else if (traveler.data.travelerStatus === '2') {
                        // The user want to set up this trip as favorite trip
                        axios.post(url3)
                            .then((res) => {
                                if (res.data === true) this.emit(':tell', 'Voyage ajouté en favori. A bientôt ' + traveler.data.travelerName + ' !')
                                else this.emit(':tell', 'Un problème est survenu. A bientôt ' + traveler.data.travelerName + ' !')
                            })
                            .catch((error) => {
                                this.emit(':tell', 'Une erreur est survenue, veuillez réessayer ou fermer Trametro.')
                            });

                        // END
                    }
                    else if (traveler.data.travelerStatus === '3') {
                        // The user want his favorite trip
                        axios.get(url4)
                            .then((fav) => {
                                // The user have a fav trip
                                this.emit(':ask', fav.data + ". Désirez-vous une autre information ?")
                            })
                            .catch((error) => {
                                this.emit(':tell', 'Une erreur est survenue, veuillez réessayer ou fermer Trametro.')
                            });
                    }

                    else if (traveler.data.travelerStatus === '4') {
                        // The user still want to ask random trips
                        let body = { travelerStatus: 5 }
                        axios.post(url2, body)
                            .then((res) => {
                                if (res.data === true) this.emit(':ask', 'Quelle ligne de tramway vous intéresse ?')
                                else this.emit(':ask', "Je n'ai pas bien compris, quelle ligne vous intéresse ?")
                            })
                    } else {
                        // The user said yes in an unusual moment
                        this.emit(':tell', 'A bientôt ' + traveler.data.travelerName + ' !')
                    }

                } else if (params.decision.value === 'non') {

                    if (traveler.data.travelerStatus === '1') {
                        // The user don't want to ask random trips anymore. Make fav ?
                        let body = { travelerStatus: 2 }
                        axios.post(url2, body)
                            .then((res) => {
                                if (res.data === true) this.emit(':ask', 'Voulez-vous garder ce trajet comme favori ?')
                                else this.emit(':ask', "Je n'ai pas bien compris, voulez-vous garder cette ligne en favori ?")
                            })
                    }

                    else if (traveler.data.travelerStatus === '2') {
                        // The user don't want to keep this as a favorite trip
                        this.emit(':tell', 'A bientôt ' + traveler.data.travelerName + ' !')
                        // END
                    }

                    else if (traveler.data.travelerStatus === '3') {
                        // The user still want to ask random trips
                        let body = { travelerStatus: 5 }
                        axios.post(url2, body)
                            .then((res) => {
                                if (res.data === true) this.emit(':ask', 'Quelle ligne de tramway vous intéresse ?')
                                else this.emit(':ask', "Je n'ai pas bien compris, quelle ligne vous intéresse ?")
                            })
                    }

                    else if (traveler.data.travelerStatus === '4') {
                        // The user don't want anything
                        this.emit(':tell', 'A bientôt ' + traveler.data.travelerName + ' !')
                        // END
                    }

                    else this.emit(':tell', 'A bientôt ' + traveler.data.travelerName + ' !')
                }
            })
            .catch((error) => {
                this.emit(':tell', 'Une erreur est survenue, veuillez réessayer ou fermer Trametro.')
            });
    },
    'AMAZON.HelpIntent': function () {

    },
    'AMAZON.CancelIntent': function () {

    },
    'AMAZON.StopIntent': function () {
        var userId = this.event.session.user.userId
        var url = 'https://trametro.herokuapp.com/api/traveler/find_one/' + userId

        axios.get(url)
            .then((res) => {
                this.emit(':tell', 'A bientôt ' + res.data.travelerName + ' !')
            })
            .catch((error) => {
                this.emit(':tell', 'A bientôt !')
            });
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
