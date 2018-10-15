const csv = require('csvtojson')

module.exports = {
    parse(req, res, next) {
        csv( ({
            delimiter: ';',
            ignoreColumns: /(course|stop_code|stop_id|is_theorical|dest_ar_code|direction_id)/
        }) )
            .fromFile("./public/files/data.csv")
            .then((jsonObj)=>{
                req.body.json = jsonObj
                next()
            })
            .catch(e => {
                error = {
                    type: 'INTERNAL_ERROR',
                    message: "Error is : " + e,
                    status: 500
                }
                next(error)
            })

    }
}