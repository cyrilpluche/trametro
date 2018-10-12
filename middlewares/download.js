var download = require('download-file')
const getCSV = require('get-csv');

var url = "http://data.montpellier3m.fr/sites/default/files/ressources/TAM_MMM_TpsReel.csv"

var options = {
    directory: "./",
    filename: "schedules.csv"
}

module.exports = {
    fromURL(req, res, next) {
        /*getCSV(url)
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
            });*/
        try {
            download(url, options, e => {
                if (e) {
                    error = {
                        type: 'INTERNAL_ERROR',
                        message: "Error is : " + e,
                        status: 500
                    }
                    next(error)
                }
                req.body.file = "Ok dude."
                next()
            });
        } catch (e) {
            error = {
                type: 'INTERNAL_ERROR',
                message: "Error is : " + e,
                status: 500
            }
            next(error)
        }

    }
}
