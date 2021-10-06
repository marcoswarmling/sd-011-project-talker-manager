const express = require('express');
const fs = require('fs');

const router = express.Router();
const { 
    validateToken,
    validateAge,
    validateName,
    validateTalk,
    validateTalkIncrements,
} = require('../middlewares/ValidatePostTalker');

const talkerWrite = (req) => {
    const talkerJSON = fs.readFileSync('./talker.json', 'utf8');
    const talkerParse = JSON.parse(talkerJSON);
    const { name, age, talk } = req;
    const id = talkerParse.length + 1;
    talkerParse.push({ name, age, id, talk });
 fs.writeFileSync('./talker.json', JSON.stringify(talkerParse));
 };

router.post(
'/',
 validateToken, 
 validateAge, 
 validateName,
 validateTalk,
 validateTalkIncrements,
(req, res) => {
const talkerRequest = req.body;
talkerWrite(talkerRequest);
return res.status(201).json(talkerRequest);
},
);

module.exports = router;