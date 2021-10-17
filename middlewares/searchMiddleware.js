const { findName } = require('../services/SearchById.js');
const { FileRead } = require('../services/FilesHandler');

const HTTP_OK_STATUS = 200;

const talkers = './talker.json';

async function searchMiddleware(request, response) {
    const { q } = request.query;
    const searchTerm = q;

    const contentFromFile = await FileRead(talkers);

    const searchForResults = findName(contentFromFile, searchTerm);

    if (!searchForResults.length) {
        return response.status(HTTP_OK_STATUS).json([]);
    }

    return response.status(HTTP_OK_STATUS).json(searchForResults);
}

module.exports = searchMiddleware;
