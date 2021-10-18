const talker = require('../helper/talker');

const getAllTalkers = (_req, res) => {
    const rawTalker = talker();
    if (rawTalker.length === 0) return res.status(200).json([]);
    res.status(200).json(rawTalker);
};

module.exports = getAllTalkers;
