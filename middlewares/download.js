const getCSV = require('get-csv');

var url = "http://data.montpellier3m.fr/sites/default/files/ressources/TAM_MMM_TpsReel.csv"

module.exports = {
    fromURL(req, res, next) {
        getCSV(url)
            .then(rows => {
                req.body.file = rows[1]
                next()
            })
            .catch( e => {
                error = {
                    type: 'INTERNAL_ERROR',
                    message: "Error is : " + e,
                    status: 500
                }
                next(error)
            })
    }
}
