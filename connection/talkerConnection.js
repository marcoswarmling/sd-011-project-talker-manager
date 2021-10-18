// Transforma o arquivo em json
const { readContent } = require('../services/services');

// é assincrona pq faz requisicao com API externa
const talkerDB = './talker.json';

async function getTalks() {
    const talkers = await readContent(talkerDB) || [];
    try {
        return talkers;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getTalks,
};