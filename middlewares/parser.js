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

    },

    intToString (req, res, next) {
        var parsedInt = []
        for (let num of req.body.result) {
            var s = "zéro"
            if (num === 0) s = "proche"
            else if (num === 1) s = "une"
            else if (num === 2) s = "deux"
            else if (num === 3) s = "trois"
            else if (num === 4) s = "quatre"
            else if (num === 5) s = "cinq"
            else if (num === 6) s = "six"
            else if (num === 7) s = "sept"
            else if (num === 8) s = "huit"
            else if (num === 9) s = "neuf"
            else if (num === 10) s = "dix"
            else s = "plus de dix"
            parsedInt.push(s)
        }
        //Check that intervals are increasing
        if (parsedInt[0] === "plus de dix") {
            if (parsedInt[1] !== "plus de dix" || parsedInt[2] !== "plus de dix") parsedInt[0] = parsedInt[1]
        } else if (parsedInt[1]) {
            if (parsedInt[2] !== "plus de dix") parsedInt[1] = parsedInt[2]
        }

        req.body.result = parsedInt
        next()
    }
}