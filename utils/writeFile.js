const fs = require('fs').promises;

async function writeFileFunc(file, newData) {
    try {
        const novo = JSON.stringify(newData);
        return await fs.writeFile(file, novo);
    } catch (error) {
        return error;
    }
}

module.exports = { writeFileFunc };