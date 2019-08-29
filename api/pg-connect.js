const pool = require('./db-config');

module.exports = async (query, values = []) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                return reject(err);
            }
            console.log('xxxxxxxxxx xxxxxxxxxxxx connected to database');
            client.query(query, values, (err, result) => {
                done();
                if (err) {
                    return reject(err);
                }
               return resolve(result);
            });
        });
    });
}