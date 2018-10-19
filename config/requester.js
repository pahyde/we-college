const https = require('https');
const request = require('request');

module.exports = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            request({
                url: url,
                method: "POST",
                json: params
            },
            function (err, res, body) {
                if (err) reject(err);

                resolve({body, res});
            });
        })
    }
}