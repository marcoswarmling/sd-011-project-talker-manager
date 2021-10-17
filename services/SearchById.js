function findId(database, targetId) {
    const NumberId = Number(targetId);

    const findResult = database.find(({ id }) => id === NumberId);

    return findResult;
}

function findName(database, targetName) {
    const formatString = String(targetName).toLowerCase();
    const filteredRe = database.filter(({ name }) => name.toLowerCase().includes(formatString));
    return filteredRe;
}

function updateContentById(database, targetId) {
    const stringToNumber = Number(targetId);

    const updatedContent = database.filter(({ id }) => Number(id) !== stringToNumber);

    return updatedContent;
}

function checkContentExistence(database, targetId) {
    const stringToNumber = Number(targetId);
    const result = database.some(({ id }) => Number(id) === stringToNumber);

    return result;
}

function deleteContentById(database, targetId) {
    const checkContent = checkContentExistence(database, targetId);

    if (!checkContent) {
        const deletedResult = {
            content: database,
            message: `O id ${targetId} não existe no banco de dados`,
        };

        return deletedResult;
    }

    const deleteContentFromId = updateContentById(database, targetId);
    const deletedResult = {
        content: deleteContentFromId,
        message: 'Pessoa palestrante deletada com sucesso',
    };

    return deletedResult;
}

module.exports = { findId, findName, updateContentById, deleteContentById };
