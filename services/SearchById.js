function findId(database, targetId) {
    const NumberId = Number(targetId);

    const findResult = database.find(({ id }) => id === NumberId);

    return findResult;
}

module.exports = { findId };