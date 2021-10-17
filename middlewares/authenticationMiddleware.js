const { handleToken } = require('../services/signupAndLoginHandlers');
const { handleFileReading } = require('../services/readAndWriteFilesHandler');

const tokens = './tokens.json';

const HTTP_UNAUTHORIZED_STATUS = 401;

async function authenticationMiddleware(request, response, next) {
    const token = request.headers.authorization;

    const tokensDatabase = await handleFileReading(tokens);

    const validateToken = handleToken(tokensDatabase, token);

    if (validateToken !== true) {
        return response.status(HTTP_UNAUTHORIZED_STATUS).json({ message: validateToken });
    }

    next();
}

module.exports = authenticationMiddleware;
