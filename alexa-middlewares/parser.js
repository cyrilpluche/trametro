const csv = require('csvtojson')

module.exports = {
    parse () {
        csv( ({
            delimiter: ';',
            ignoreColumns: /(course|stop_code|stop_id|is_theorical|dest_ar_code|direction_id)/
        }) )
            .fromFile("./public/files/data.csv")
            .then((jsonObj)=>{
                return jsonObj
            })
            .catch(e => { return [] })

    }
}