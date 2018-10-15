var download = require('download-file')
const getCSV = require('get-csv');

module.exports = {

    fromURL() {
        var url = "http://data.montpellier3m.fr/sites/default/files/ressources/TAM_MMM_TpsReel.csv"
        var options = {
            directory: "./public/files",
            filename: "data.csv"
        }

        try {
            download(url, options, e => { return !e })
        } catch (e) {
            return false
        }

    }
}
