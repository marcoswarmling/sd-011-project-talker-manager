const express = require('express');
const checkToken  = require('../middlewares/checkToken');

const routter = express.Router();

routter.get('/search', checkToken.checkToken,
async (req, res) => {
    const { q } = req.query;
    const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
    const talkerIndex = fileContent.filter((t) => t.name.includes(q));
    return res.status(200).json(talkerIndex);
});

module.exports = routter;