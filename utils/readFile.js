const fs = require('fs').promises;

module.exports = async function readFileFunc(file) {
    try {
        return await fs.readFile(file, 'utf8');
    } catch (error) {
        return error;
    }
};