module.exports = {
    update (object, field) {
        // We retrieve the query arguments
        let travelerId = this.event.session.user.userId
        let sessionId = this.event.session.sessionId
        let params = this.event.request.intent.slots
        let args = mw.parser.parseLigneIndent(params)

        // We build the query for request
        let query = "?travelerId=" + travelerId + "&sessionId=" + sessionId
        var url = 'https://trametro.herokuapp.com/api/trip/update_session' + query
        var url1 = 'https://trametro.herokuapp.com/api/trip/get_and_reset' + query

        if (field === "ligneCode") {
            let body = {
                ligneCode: args.ligneCode,
                isTripFinished: false,
                sessionId: sessionId,
                travelerId: travelerId
            }
        }
        else if (field === "directionCode") {
            let body = {
                directionCode: args.directionCode,
                isTripFinished: false,
                sessionId: sessionId,
                travelerId: travelerId
            }
        }
        else {
            let body = {
                stationCode: args.stationCode,
                isTripFinished: false,
                sessionId: sessionId,
                travelerId: travelerId
            }
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
    }
}