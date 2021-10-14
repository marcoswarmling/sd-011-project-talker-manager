const crypto = require('crypto');

module.exports = function tokenGen(length) {
    return crypto.randomBytes(length).toString('hex');
};