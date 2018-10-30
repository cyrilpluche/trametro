module.exports = {
    builder (object) {
        try {
            let keys = Object.keys(object);
            let values = Array.from(object);
            let url = '?';
            let i = 0

            if (keys.length > 0) {
                for (let k of keys) {
                    url += k + '=' + values[i]
                    if (i < keys.length - 1) url += '&'
                    i += 1
                }
                return url
            } else {
                return ''
            }
        } catch (err) {
            return err.message
        }


    }
}