const bcrypt = require('bcrypt');
const SALT_ROUNDS = 5;

module.exports = {
    hash: user => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
                if (err) reject(err);

                user.password = hash;
                resolve(user);
            })
        })
    },

    compare: (client, dbUser) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(client.password, dbUser.password, (err, isMatch) => {
                if (err) reject(err);
                
                resolve(isMatch);
            });
        })
           
    }
}