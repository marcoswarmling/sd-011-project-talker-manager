// Transforma o arquivo em json
const { readContent } = require('../services/services');

// é assincrona pq faz requisicao com API externa
const talkerDB = './talker.json';

async function getTalks() {
    try {
        const talkers = await readContent(talkerDB) || [];
        return talkers;
    } catch (error) {
        return error;
    }
}

async function getIdTalks(id) {
    try {
        const talkersId = await readContent(talkerDB) || [];
        const talker = talkersId.find((obj) => obj.id === Number(id));
        return talker;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getTalks, getIdTalks };
