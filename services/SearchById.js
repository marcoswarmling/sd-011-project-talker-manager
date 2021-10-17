function findId(database, targetId) {
    const NumberId = Number(targetId);

    const findResult = database.find(({ id }) => id === NumberId);

    return findResult;
}

function findName(database, targetName) {
    const formatString = String(targetName).toLowerCase();
    // eslint-disable-next-line no-unused-vars
    const filteredRe = database.filter(({ name }) => name.toLowerCase().includes(formatString));
}
function updateContentById(database, targetId) {
    const stringToNumber = Number(targetId);

    const updatedContent = database.filter(({ id }) => Number(id) !== stringToNumber);

    return updatedContent;
}

module.exports = { findId, findName, updateContentById };
